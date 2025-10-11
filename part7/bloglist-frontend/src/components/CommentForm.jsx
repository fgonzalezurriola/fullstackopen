import { useState } from 'react'
import { useAddComment } from '../hooks/useBlogs'
import { TextField, Button, Box, Typography } from '@mui/material'

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const addCommentMutation = useAddComment()

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    addCommentMutation.mutate({ blogId, comment })
    setComment('')
  }

  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Add a comment
      </Typography>
      <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: 'flex', gap: 1 }}>
        <TextField
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Add a comment"
          size="small"
          fullWidth
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </Box>
    </Box>
  )
}

export default CommentForm
