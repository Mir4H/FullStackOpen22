import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
import { setNotify } from './notifyReducer'
import { loginUser } from '../reducers/userReducer'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendUsers(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setUsers, appendUsers } = usersSlice.actions

export const initialUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export const createUser = (content) => {
  return async (dispatch) => {
    try {
      const newUser = await usersService.create(content)
      await dispatch(appendUsers(newUser))
      dispatch(loginUser(content.username, content.password))
    } catch (error) {
      dispatch(setNotify(`${error.response.data.error}`, 7, 'alert'))
    }
  }
}

export default usersSlice.reducer
