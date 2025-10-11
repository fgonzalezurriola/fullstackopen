import { useParams } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'

const User = () => {
  const { id } = useParams()
  const { data: users = [] } = useUsers()

  const user = users.find((u) => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
