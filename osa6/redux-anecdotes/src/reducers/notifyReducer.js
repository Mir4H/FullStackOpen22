import { createSlice } from '@reduxjs/toolkit'

const notifySlice = createSlice({
    name: 'notification',
    initialState: {
        message: null,
    },
    reducers: {
        showNotification(state, action) {
          state.message = action.payload
        },
        hideNotification(state) {
            state.message = null
        },
    }
})

export const { showNotification, hideNotification } = notifySlice.actions

export const showNotificationAsync = (msg, time) => (dispatch) => {
    dispatch(showNotification(msg))
    setTimeout(() => {
      dispatch(hideNotification())
    }, time*1000)
  }

export default notifySlice.reducer