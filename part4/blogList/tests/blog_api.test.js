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

const getAuthToken = async () => {
  const loginData = { username: 'blogtestuser', password: 'testpassword' }
  const loginResult = await api.post('/api/login').send(loginData)
  return loginResult.body.token
}

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
      const token = await getAuthToken()
      const likelessBlog = {
        title: 'likelessBlog',
        author: 'me',
        url: 'example.com',
      }

      await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(likelessBlog).expect(201)

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

  describe('posting a blog', () => {
    test('a valid blog can be added', async () => {
      const token = await getAuthToken()
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://example.com',
        likes: 5,
      }

      const blogsAtStart = await helper.blogsInDb()

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

      const titles = blogsAtEnd.map((b) => b.title)
      assert(titles.includes('Test Blog'))
    })

    test('blog without title is not added', async () => {
      const token = await getAuthToken()
      const newBlog = {
        author: 'Test Author',
        url: 'http://example.com',
        likes: 5,
      }

      const blogsAtStart = await helper.blogsInDb()

      await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('blog without url is not added', async () => {
      const token = await getAuthToken()
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        likes: 5,
      }

      const blogsAtStart = await helper.blogsInDb()

      await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  })

  describe('deletion of a blog', () => {
    test('delete succeeds with status code 204', async () => {
      const token = await getAuthToken()
      const newBlog = {
        title: 'to be deleted',
        author: 'me',
        url: 'example.com',
        likes: 7,
      }

      const blogsAtStart = await helper.blogsInDb()
      const response = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201)
      await api.delete(`/api/blogs/${response.body.id}`).set('Authorization', `Bearer ${token}`).expect(204)
      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
    })

    test('only the creator of the blog can delete a blog', async () => {
      const token = await getAuthToken()
      const newBlog = {
        title: 'to be deleted',
        author: 'me',
        url: 'example.com',
        likes: 7,
      }

      const blogsAtStart = await helper.blogsInDb()
      const response = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201)

      const passwordHash = await bcrypt.hash('otherpassword', 10)
      const otherUser = new User({
        username: 'otheruser',
        name: 'Other User',
        passwordHash,
      })
      await otherUser.save()

      const otherLoginData = { username: 'otheruser', password: 'otherpassword' }
      const otherLoginResult = await api.post('/api/login').send(otherLoginData)
      const otherToken = otherLoginResult.body.token

      await api.delete(`/api/blogs/${response.body.id}`).set('Authorization', `Bearer ${otherToken}`).expect(403)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtStart.length + 1, blogsAtEnd.length)
    })
  })

  describe('changing a blog', () => {
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

  describe('token tests - login and using the token to create blogs', () => {
    test('token is returned and valid format', async () => {
      const loginData = { username: 'blogtestuser', password: 'testpassword' }
      const loginResult = await api.post('/api/login').send(loginData)

      const token = loginResult.body.token

      assert(typeof token === 'string')
      assert.strictEqual(token.split('.').length, 3)
    })

    test('token contains correct user information', async () => {
      const jwt = require('jsonwebtoken')

      const loginData = { username: 'blogtestuser', password: 'testpassword' }
      const loginResult = await api.post('/api/login').send(loginData)

      const token = loginResult.body.token
      const decodedToken = jwt.verify(token, process.env.SECRET)

      assert.strictEqual(decodedToken.username, 'blogtestuser')
      assert(decodedToken.id)
    })

    test('adding a blog fails with 401 if token is not provided', async () => {
      const newBlog = {
        title: 'no token blog',
        author: 'me',
        url: 'example.com',
        likes: 7,
      }

      await api.post('/api/blogs').send(newBlog).expect(401)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
