const { describe, test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const assert = require('assert')
const blog = require('../models/blog')

const api = supertest(app)

describe('Blog API tests', () => {
  beforeEach(async () => {
    await blog.deleteMany({})
    let blog1 = new blog(helper.initialBlogs[0])
    await blog1.save()
    let blog2 = new blog(helper.initialBlogs[1])
    await blog2.save()
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
      const updatedLikes = await blog.findById(blogToUpdate.id)
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
