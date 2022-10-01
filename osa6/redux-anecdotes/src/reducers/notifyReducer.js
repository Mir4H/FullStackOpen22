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

export const showNotificationAsync = (msg) => (dispatch) => {
    dispatch(showNotification(msg))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

export default notifySlice.reducer