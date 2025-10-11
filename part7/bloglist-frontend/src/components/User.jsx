import { useParams } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'
import { Container, List, ListItem, ListItemText } from '@mui/material'

const User = () => {
  const { id } = useParams()
  const { data: users = [] } = useUsers()

  const user = users.find((u) => u.id === id)

  if (!user) {
    return null
  }

  return (
    <Container>
      <h2>{user.username}</h2>
      added blogs
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default User
