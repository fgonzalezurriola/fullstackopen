const { describe, test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const assert = require('assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('Blog API tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testpassword', 10)
    const user = new User({
      username: 'blogtestuser',
      name: 'Blog Test User',
      passwordHash,
    })
    const savedUser = await user.save()

    const blog1 = new Blog({
      ...helper.initialBlogs[0],
      user: savedUser._id,
    })
    const savedBlog1 = await blog1.save()

    const blog2 = new Blog({
      ...helper.initialBlogs[1],
      user: savedUser._id,
    })
    const savedBlog2 = await blog2.save()

    await User.findByIdAndUpdate(savedUser._id, {
      blogs: [savedBlog1._id, savedBlog2._id],
    })
  })

  describe('get blogs api tests', () => {
    test('blogs are returned as json', async () => {
      await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    })

    test('blog posts have id property', async () => {
      const response = await api.get('/api/blogs')

      response.body.forEach((blog) => {
        assert('id' in blog)
        assert(!('_id' in blog))
      })
    })

    test('blog posts have likes', async () => {
      const likelessBlog = {
        title: 'likelessBlog',
        author: 'me',
        url: 'example.com',
      }

      await api.post('/api/blogs').send(likelessBlog).expect(201)
      const response = await api.get('/api/blogs')
      response.body.forEach((blog) => {
        assert('likes' in blog)
        assert(blog.likes >= 0)
        if (blog.title === 'likelessBlog') {
          assert(blog.likes === 0)
        }
      })
    })

    test('blogs have an user property', async () => {
      const response = await api.get('/api/blogs')
      response.body.forEach((blog) => {
        assert('user' in blog)
      })
    })

    test('blogs are returned with user information populated', async () => {
      const response = await api.get('/api/blogs')

      assert('user' in response.body[0])
      assert('username' in response.body[0].user)
      assert('name' in response.body[0].user)
      assert('id' in response.body[0].user)
      assert(!('passwordHash' in response.body[0].user))
    })
  })

  describe('deletion of a note', () => {
    test('delete succeeds with status code 204', async () => {
      const newBlog = {
        title: 'to be deleted',
        author: 'me',
        url: 'example.com',
        likes: 7,
      }

      const blogsAtStart = await helper.blogsInDb()
      const response = await api.post('/api/blogs').send(newBlog).expect(201)
      await api.delete(`/api/blogs/${response.body.id}`).expect(204)
      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
    })
  })

  describe('changing a note', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const newLikes = 100
      await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: newLikes }).expect(200)
      const updatedLikes = await Blog.findById(blogToUpdate.id)
      assert.strictEqual(updatedLikes.likes, newLikes)
    })

    test('fails with 404 code if id is not valid', async () => {
      const newLikes = 100
      const fakeID = new mongoose.Types.ObjectId()
      await api.put(`/api/blogs/${fakeID}`).send({ likes: newLikes }).expect(404)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
