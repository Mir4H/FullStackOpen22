/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogsReducer'
import { initialUsers } from './reducers/usersReducer'
import { userData } from './reducers/userReducer'

import userService from './services/user'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserForm from './components/UserFrom'
import Home from './components/Home'
import Users from './components/Users'
import UserDetails from './components/UserDetails'

import BlogDetails from './components/BlogDetails'
import PageNotFound from './components/PageNotFound'

import { Container } from '@mui/material'
import MenuBar from './components/MenuBar'

const App = () => {
  const accountRef = useRef()
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

  if (user === null) {
    return (
      <Container>
        <Notification />
        <LoginForm />
        <Togglable buttonLabel="create account" ref={accountRef}>
          <UserForm />
        </Togglable>
      </Container>
    )
  }

  return (
    <Container>
      <MenuBar />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Container>
  )
}

export default App
