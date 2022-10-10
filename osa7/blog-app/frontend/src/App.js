/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch
} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import User from './components/User'

import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogsReducer'
import { userData } from './reducers/userReducer'
import userService from './services/user'
import UserForm from './components/UserFrom'
import Home from './components/Home'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import { initialUsers } from './reducers/usersReducer'
import users from './services/users'
import BlogDetails from './components/BlogDetails'
import PageNotFound from './components/PageNotFound'

const App = () => {
  const accountRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

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
      <>
        <Notification />
        <LoginForm />
        <Togglable buttonLabel="create account" ref={accountRef}>
          <UserForm />
        </Togglable>
      </>
    )
  }
  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
      </div>
      <User />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/users/:id"
          element={<UserDetails users={users} blogs={blogs} />}
        />
        <Route
          path="/blogs/:id"
          element={<BlogDetails blogs={blogs} user={user} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
