import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material'

const Menu = ({ user, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Typography sx={{ mr: 2 }}>{user.username} logged in</Typography>
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
