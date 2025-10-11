import { useState } from 'react'
import { useAddComment } from '../hooks/useBlogs'

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const addCommentMutation = useAddComment()

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    addCommentMutation.mutate({ blogId, comment })
    setComment('')
  }

  return (
    <form onSubmit={handleCommentSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Add a comment"
      />
      <button type="submit">Add Comment</button>
    </form>
  )
}

export default CommentForm
