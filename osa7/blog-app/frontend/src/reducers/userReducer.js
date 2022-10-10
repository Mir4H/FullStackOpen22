import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import loginService from '../services/login'
import { setNotify } from '../reducers/notifyReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    userData(state, action) {
      return action.payload
    }
  }
})

export const { userData } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(userData(user))
      userService.setUser(user)
      dispatch(setNotify(`Welcome ${user.name}. You are now logged in!`, 5))
    } catch (error) {
      dispatch(setNotify('wrong username/password', 5, 'alert'))
    }
  }
}

export default userSlice.reducer
