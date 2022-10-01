import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notifyReducer from './reducers/notifyReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notifyReducer,
    filtering: filterReducer,
  }
})

export default store