import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

let timeoutId = null

export const setNotificationTimeout = (message, seconds = 5) => {
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    dispatch(setNotification(message))

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
      timeoutId = null
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
