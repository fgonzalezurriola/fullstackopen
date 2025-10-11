import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { Snackbar } from '@mui/material'

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  if (notification === '') {
    return null
  }

  const handleClose = () => {
    notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
  }

  return (
    <Snackbar
      open={Boolean(notification)}
      message={notification}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    />
  )
}

export default Notification
