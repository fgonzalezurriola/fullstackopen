const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).json({ error: 'title and url are required' })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  const user = await User.findOne()

  if (!user) {
    return response.status(400).json({ error: 'no users in the database' })
  }

  blog.user = user._id
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new: true })

  if (!updatedBlog) {
    return response.status(404).end()
  }
  response.json(updatedBlog)
})

module.exports = blogsRouter
