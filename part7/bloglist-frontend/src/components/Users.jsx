import { Link } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

const Users = () => {
  const { data: users = [] } = useUsers()

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>User</strong>
              </TableCell>
              <TableCell>
                <strong>Blogs created</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
                    {user.username}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Users
