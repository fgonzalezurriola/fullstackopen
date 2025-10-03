import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [displayDetails, setDisplayDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (displayDetails) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setDisplayDetails(false)}>hide </button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={handleLike}>like</button>
        <br />
        {blog.author}
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
