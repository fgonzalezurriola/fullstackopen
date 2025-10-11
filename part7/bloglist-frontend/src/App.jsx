import { useState, useEffect, useContext } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import UserContext from './UserContext'
import { useBlogs, useUpdateBlog, useDeleteBlog } from './hooks/useBlogs'
import useNotification from './hooks/useNotification'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { setNotification } = useNotification()
  const [user, userDispatch] = useContext(UserContext)
  const { data: blogs = [] } = useBlogs()
  const updateBlogMutation = useUpdateBlog()
  const deleteBlogMutation = useDeleteBlog()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET_USER', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'SET_USER', payload: user })
      setNotification(`Login successful ${username}`)
      setUsername('')
      setPassword('')
      console.log('logged in', user)
    } catch {
      console.log('error in handlelogin')
      setNotification('wrong credentials')
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

    updateBlogMutation.mutate({ id, updatedBlog, blog })
    console.log('blog liked', blog)
  }

  const handleDeleteBlog = (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (window.confirm(`Remove blog ${blog.title}`)) {
      deleteBlogMutation.mutate(id)
      setNotification(`Blog ${blog.title} deleted`)
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

      <Menu user={user} handleLogout={handleLogout} />

      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <BlogView handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} user={user} />
          }
        />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Blogs blogs={blogs} />} />
      </Routes>
    </div>
  )
}

export default App
