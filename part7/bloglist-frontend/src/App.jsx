import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const { data: blogs = [] } = useQuery({ queryKey: ['blogs'], queryFn: blogService.getAll })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `Login successful ${username}` })
      setUsername('')
      setPassword('')
      console.log('logged in', user)
    } catch {
      console.log('error in handlelogin')
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: 'wrong credentials' })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
    console.log('logged out')
  }

  const handleLike = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user?.id || blog.user?._id || blog.user,
    }

    blogService.update(id, updatedBlog).then((returnedBlog) => {
      const blogToUpdate = {
        ...returnedBlog,
        user: returnedBlog.user || blog.user,
      }
      queryClient.setQueryData(['blogs'], (oldBlogs) => 
        oldBlogs.map((b) => (b.id !== id ? b : blogToUpdate))
      )
    })

    console.log('blog liked', blog)
  }

  const handleDeleteBlog = (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (window.confirm(`Remove blog ${blog.title}`)) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          queryClient.setQueryData(['blogs'], (oldBlogs) => oldBlogs.filter((b) => b.id !== id))
          notificationDispatch({ type: 'SET_NOTIFICATION', payload: `Blog ${blog.title} deleted` })
        })
        .catch((error) => {
          notificationDispatch({
            type: 'SET_NOTIFICATION',
            payload: `Error: ${error.response?.data?.error || error.message}`,
          })
        })
    }
    console.log('blog deleted', blog)
  }

  if (user === null) {
    return (
      <div>
        <h1>BlogsApp </h1>
        <Notification />

        <h2>log in to application</h2>

        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h1>BlogsApp</h1>
      <Notification />

      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>

      <h2>blogs</h2>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={handleLike}
            handleDeleteBlog={handleDeleteBlog}
          />
        ))}
    </div>
  )
}

export default App
