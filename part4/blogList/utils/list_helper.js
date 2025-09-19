var _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  return blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = null
  for (let idx = 0; idx < blogs.length; idx++) {
    if (!favorite || favorite.likes < blogs[idx].likes) favorite = blogs[idx]
  }
  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const grouped = _.countBy(blogs, 'author')
  const top = _.maxBy(Object.entries(grouped), ([, count]) => count)
  return { author: top[0], blogs: top[1] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorLikes = _(blogs)
    .groupBy('author')
    .mapValues((authorBlogs) => _.sumBy(authorBlogs, 'likes'))
    .entries()
    .maxBy(1)

  return { author: authorLikes[0], likes: authorLikes[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
