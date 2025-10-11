import { useParams } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'
import CommentForm from './CommentForm'
import Comments from './Comments'
import { Container, Button, Card, CardContent, Box, Link } from '@mui/material'

const BlogView = ({ handleLike, handleDeleteBlog, user }) => {
  const { id } = useParams()
  const { data: blogs = [] } = useBlogs()

  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return null
  }

  const isOwner = blog.user?.username === user?.username || blog.user === user?.id

  return (
    <Container>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <h4>{blog.title}</h4>
          <h6>{blog.author}</h6>
          <Link href={blog.url} target="_blank" rel="noopener">
            {blog.url}
          </Link>
          <Box sx={{ mt: 2, mb: 2 }}>
            <p>
              {blog.likes} likes{' '}
              <Button variant="contained" size="small" onClick={() => handleLike(blog.id)}>
                like
              </Button>
            </p>
          </Box>
          <p>added by {blog.user?.username || blog.user?.name}</p>
          {isOwner && (
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ mt: 1 }}
              onClick={() => handleDeleteBlog(blog.id)}
            >
              remove
            </Button>
          )}
        </CardContent>
      </Card>

      <CommentForm blogId={blog.id} />
      <Comments blog={blog} />
    </Container>
  )
}

export default BlogView
