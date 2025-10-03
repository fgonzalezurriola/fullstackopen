import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
      setMessage(`Login successful ${username}`)
      setMessageType('success')
      setUsername('')
      setPassword('')
      console.log('logged in', user)
    } catch {
      console.log('error in handlelogin')
      setMessage('wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
      ...blog,
      likes: blog.likes + 1,
    }

    blogService.update(id, updatedBlog).then((returnedBlog) => {
      setBlogs(blogs.map((b) => (b.id !== id ? b : returnedBlog)))
    })
  }

  const createBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setMessage(`Error: ${error.response.data.error}`)
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    console.log('blog created', blogObject)
  }

  if (user === null) {
    return (
      <div>
        <h1>BlogsApp </h1>
        <Notification message={message} type={messageType} />

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
      <Notification message={message} type={messageType} />

      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={createBlog} />
      </Togglable>

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      ))}
    </div>
  )
}

export default App
