import { useState } from 'react'

const BlogList = ({ blog, user, handleLike, handleDeleteBlog }) => {
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

  return (
    <div className="blog" style={blogStyle} data-testid="blog-item" data-blog-id={blog.id}>
      <div>
        {blog.title} | {blog.author}
        {displayDetails ? (
          <button onClick={() => setDisplayDetails(false)}>hide</button>
        ) : (
          <button onClick={() => setDisplayDetails(true)}>view</button>
        )}
      </div>
      {displayDetails && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            <span className="likes" data-testid="likes" style={{ color: 'purple' }}>
              likes {blog.likes}{' '}
              <button data-testid="like-btn" onClick={() => handleLike(blog.id)}>
                like
              </button>
            </span>
          </div>
          <div>{blog.user?.username || 'Unknown'}</div>
          {blog.user?.username === user.username && (
            <button
              data-testid="remove-btn"
              style={buttonStyle}
              onClick={() => handleDeleteBlog(blog.id)}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default BlogList
