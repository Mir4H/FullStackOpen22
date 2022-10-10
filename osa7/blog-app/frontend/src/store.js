import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import notifyReducer from './reducers/notifyReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notifyReducer,
    user: userReducer,
    users: usersReducer
  }
})

export default store
