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
})

describe('post Blog api tests', () => {
  const testBlog = {
    title: 'test title',
    author: 'me',
    url: 'example.com',
    likes: 7,
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
})

after(async () => {
  await mongoose.connection.close()
})
