const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 100,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d1710',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    url: 'http://example.com',
    likes: 110,
    __v: 0,
  },
]

describe('totalLikes function', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('total likes of one element', () => {
    assert.strictEqual(listHelper.totalLikes([{ likes: 5 }]), 5)
  })

  test('total likes of a bigger list', () => {
    assert.strictEqual(listHelper.totalLikes([{ likes: 2 }, { likes: 6 }, { likes: 3 }]), 11)
  })
})

describe('favoriteBlog function', () => {
  test('favoriteBlog of a list', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      _id: '5a422aa71b54a676234d1710',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      url: 'http://example.com',
      likes: 110,
      __v: 0,
    })
  })
  test('favoriteBlog of empty list is null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })
})

describe('mostBlogs function', () => {
  test('mostBlog of a list', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), { author: 'Edsger W. Dijkstra', blogs: 2 })
  })

  test('mostBlogs of a empty list is null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })
})

describe('mostLikes function', () => {
  test('mostLikes of a list', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), { author: 'Robert C. Martin', likes: 110 })
  })

  test('mostLikes of a empty list is null', () => {
    assert.strictEqual(listHelper.mostLikes([]), null)
  })
})
