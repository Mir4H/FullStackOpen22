/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  timer: null,
  style: null
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
      state.style = action.payload.style
    },
    hideNotification(state) {
      return initialState
    }
  }
})

export const { showNotification, hideNotification } = notifySlice.actions

export const setNotify = (msg, time, style) => {
  return (dispatch) => {
    const timer = setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
    dispatch(showNotification({ message: msg, timer: timer, style: style }))
  }
}

export default notifySlice.reducer
