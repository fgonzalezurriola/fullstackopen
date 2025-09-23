const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'The C Programming Language',
    author: 'Brian W. Kernighan',
    url: 'http://example.com/',
    likes: 7,
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    url: 'http://example.com/CleanCode',
    likes: 5,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'temp', url: 'temp.com' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
