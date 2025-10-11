import { useState } from 'react'
import { Button } from '@mui/material'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const paddingStyle = { padding: 12 }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={{ ...hideWhenVisible, ...paddingStyle }}>
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="contained" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
}

export default Togglable
