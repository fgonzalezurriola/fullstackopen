import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDeleteBlog }) => {
  const [displayDetails, setDisplayDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const buttonStyle = {
    backgroundColor: 'lightblue',
    marginBottom: 5,
  }

  if (displayDetails) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setDisplayDetails(false)}>hide </button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={() => handleLike(blog.id)}>like</button>
        <br />
        {blog.user?.username || 'Unknown'}
        <br />
        {blog.user?.username === user.username && (
          <button style={buttonStyle} onClick={() => handleDeleteBlog(blog.id)}>
            remove
          </button>
        )}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} | {blog.author}
      <button onClick={() => setDisplayDetails(true)}>view</button>
    </div>
  )
}

export default Blog
