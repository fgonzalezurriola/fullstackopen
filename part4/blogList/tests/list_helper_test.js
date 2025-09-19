const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favoriteBlog function', () => {
  test('favoriteBlog of a list', () => {
    const bigBlog = [
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

    const result = listHelper.favoriteBlog(bigBlog)
    assert.deepStrictEqual(result, {
      _id: '5a422aa71b54a676234d1710',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      url: 'http://example.com',
      likes: 110,
      __v: 0,
    })
  })
})

describe('totalLikes function', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('total likes of one element', () => {
    const blogs = [{ likes: 5 }]
    assert.strictEqual(listHelper.totalLikes(blogs), 5)
  })

  test('total likes of a bigger list', () => {
    const blogs = [{ likes: 2 }, { likes: 6 }, { likes: 3 }]
    assert.strictEqual(listHelper.totalLikes(blogs), 11)
  })
})
