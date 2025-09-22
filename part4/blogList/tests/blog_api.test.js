const { describe, test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')

const api = supertest(app)

describe('get Blog api tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
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

describe('post Blog api tests', () => {
  const testBlog = {
    title: 'test title',
    author: 'me',
    url: 'example.com',
    likes: 7,
  }
  const titlelessBlog = {
    author: 'notme',
    url: 'example.com',
    likes: 10,
  }
  const urllessBlog = {
    title: 'title',
    author: 'notme',
    likes: 30,
  }

  test('create and delete a blog', async () => {
    const initialBlogs = (await api.get('/api/blogs')).body.length
    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const endingBlogs = (await api.get('/api/blogs')).body.length
    assert(initialBlogs < endingBlogs)
  })

  test('blogs without title or url answer with 400 code', async () => {
    await api
      .post('/api/blogs')
      .send(titlelessBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .send(urllessBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})
