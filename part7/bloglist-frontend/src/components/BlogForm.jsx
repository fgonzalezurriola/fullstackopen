import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const BlogForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
    onError: (error) => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: error.response?.data?.error || error.message,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const form = event.target
    const blog = {
      title: form.elements.blog.value,
      author: form.elements.author.value,
      url: form.elements.url.value,
    }
    form.elements.blog.value = ''
    form.elements.author.value = ''
    form.elements.url.value = ''
    newBlogMutation.mutate(blog)
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={onCreate}>
        Title: <input name="blog" data-testid="title-input" /> <br />
        Author: <input name="author" data-testid="author-input" /> <br />
        URL: <input name="url" data-testid="url-input" /> <br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
