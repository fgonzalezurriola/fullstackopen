import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Container, Typography, Card, CardContent } from '@mui/material'

const Blogs = ({ blogs }) => {
  return (
    <Container>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>

      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        blogs
      </Typography>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Card key={blog.id} sx={{ mb: 1 }}>
            <CardContent>
              <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
                {blog.title} - {blog.author}
              </Link>
            </CardContent>
          </Card>
        ))}
    </Container>
  )
}

export default Blogs
