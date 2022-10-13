import { useEffect } from 'react'
import {
  Navigate,
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogsReducer'
import { initialUsers } from './reducers/usersReducer'
import { userData } from './reducers/userReducer'
import userService from './services/user'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Home from './components/Home'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import PageNotFound from './components/PageNotFound'
import MenuBar from './components/MenuBar'

import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initialBlogs())
    dispatch(initialUsers())
  }, [dispatch])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(userData(userFromStorage))
    }
  }, [])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    fontFamily: theme.typography.fontFamily,
    padding: theme.spacing(6),
    color: theme.palette.text.secondary
  }))

  return (
    <>
      <MenuBar />
      <Notification />
      <Item>
        <Routes>
          <Route
            path="/"
            element={
              user !== null ? <Home /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/users"
            element={
              user !== null ? <Users /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/login"
            element={
              user === null ? <LoginForm /> : <Navigate replace to="/" />
            }
          />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Item>
    </>
  )
}

export default App
