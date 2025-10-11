import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ blogs }) => {
  return (
    <>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>

      <h2>blogs</h2>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
    </>
  )
}

export default Blogs
