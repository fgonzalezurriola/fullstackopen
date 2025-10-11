import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const Users = () => {
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
