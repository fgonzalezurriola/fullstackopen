import { Typography, List, ListItem, ListItemText } from '@mui/material'

const Comments = ({ blog }) => {
  if (!blog.comments || blog.comments.length === 0) {
    return (
      <div>
        <Typography variant="h6" sx={{ mt: 2 }}>
          comments
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No comments yet
        </Typography>
      </div>
    )
  }

  return (
    <div>
      <Typography variant="h6" sx={{ mt: 2 }}>
        comments
      </Typography>
      <List>
        {blog.comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemText primary={comment} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Comments
