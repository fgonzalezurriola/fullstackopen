const { describe, test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const assert = require('assert')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

const api = supertest(app)

describe('User API tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  describe('when there is initially one user in db', () => {
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'fgonz',
        name: 'francisco',
        password: 'hashing',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map((u) => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('users are returned with their blogs populated', async () => {
      const response = await api.get('/api/users')

      assert('blogs' in response.body[0])
      assert(Array.isArray(response.body[0].blogs))
    })

    test('creation fails with status 400 if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = { username: 'root', name: 'superRoot', password: 'superHash' }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.body.error, 'username must be unique')

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with status 400 if username has less than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = { username: 'ro', name: 'superRoot', password: 'superHash' }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.body.error, 'username must be at least 3 characters long')

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with status 400 if password has less than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = { username: 'root', name: 'root', password: 'su' }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.body.error, 'password must be at least 3 characters long')

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with status 400 if username is not provided', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = { name: 'superRoot', password: 'superHash' }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.body.error, 'username is required')

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with status 400 if password is not provided', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = { username: 'root', name: 'superRoot' }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.body.error, 'password is required')

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
