import { useCreateBlog } from '../hooks/useBlogs'
import { TextField, Button, Box, Typography } from '@mui/material'

const BlogForm = () => {
  const createBlogMutation = useCreateBlog()

  const onCreate = async (event) => {
    event.preventDefault()
    const form = event.target
    const blog = {
      title: form.elements.blog.value,
      author: form.elements.author.value,
      url: form.elements.url.value,
    }
    form.elements.blog.value = ''
    form.elements.author.value = ''
    form.elements.url.value = ''
    createBlogMutation.mutate(blog)
  }

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create new blog
      </Typography>
      <Box component="form" onSubmit={onCreate}>
        <TextField name="blog" label="Title" fullWidth margin="normal" data-testid="title-input" />
        <TextField
          name="author"
          label="Author"
          fullWidth
          margin="normal"
          data-testid="author-input"
        />
        <TextField name="url" label="URL" fullWidth margin="normal" data-testid="url-input" />
        <Button variant="contained" type="submit" sx={{ mt: 1 }}>
          Create
        </Button>
      </Box>
    </Box>
  )
}

export default BlogForm
