const { describe, test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')

const api = supertest(app)

describe('Blog api tests', () => {
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

after(async () => {
  await mongoose.connection.close()
})
