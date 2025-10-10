const { describe, test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

describe('Login API tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testpassword', 10)
    const user = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash,
    })
    await user.save()
  })

  test('login succeeds with correct credentials', async () => {
    const loginData = {
      username: 'testuser',
      password: 'testpassword',
    }

    const result = await api
      .post('/api/login')
      .send(loginData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert(result.body.token)
    assert.strictEqual(result.body.username, 'testuser')
    assert.strictEqual(result.body.name, 'Test User')
  })

  test('login fails with wrong password', async () => {
    const loginData = {
      username: 'testuser',
      password: 'wrongpassword',
    }

    const result = await api
      .post('/api/login')
      .send(loginData)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.error, 'invalid username or password')
  })

  test('login fails with non-existent username', async () => {
    const loginData = {
      username: 'nonexistent',
      password: 'testpassword',
    }

    const result = await api
      .post('/api/login')
      .send(loginData)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.error, 'invalid username or password')
  })

  test('login fails without username', async () => {
    const loginData = {
      password: 'testpassword',
    }

    await api.post('/api/login').send(loginData).expect(401)
  })

  test('login fails without password', async () => {
    const loginData = {
      username: 'testuser',
    }

    await api.post('/api/login').send(loginData).expect(401)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
