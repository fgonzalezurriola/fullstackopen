import { Link } from "react-router-dom"

const MenuStyle = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 5,
  backgroundColor: 'lightgrey',
  width: '300px',
}

const padding = {
  padding: 5,
}

const Menu = ({ user, handleLogout }) => {
  return (
    <div style={MenuStyle}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user.username} logged in<button onClick={handleLogout}> logout</button>
    </div>
  )
}

export default Menu
