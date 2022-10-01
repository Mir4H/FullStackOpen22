import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  timer: null,
}

const notifySlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      if (state.timer) {
        clearTimeout(state.timer)
      }
      state.message = action.payload.message
      state.timer = action.payload.timer
    },
    hideNotification(state) {
      return initialState
    },
  }
})

export const { showNotification, hideNotification } = notifySlice.actions

export const setNotify = (msg, time) => {
  return dispatch => {
    const timer = setTimeout(() => {
      dispatch(hideNotification())
    }, time*1000)
    dispatch(showNotification({ message: msg, timer: timer }))
  }
}

export default notifySlice.reducer