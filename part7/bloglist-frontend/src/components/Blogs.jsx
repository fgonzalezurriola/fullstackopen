import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ blogs, user, handleLike, handleDeleteBlog }) => {
  return (
    <>
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
    </>
  )
}

export default Blogs
