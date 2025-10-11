import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const useNotification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const setNotification = (message, timeout = 5000) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, timeout)
  }

  const clearNotification = () => {
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }

  return { notification, setNotification, clearNotification }
}

export default useNotification
