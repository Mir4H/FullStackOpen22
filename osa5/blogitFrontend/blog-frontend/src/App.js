import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setErrorMessage({
        message: `Logged in as ${user.name}`,
        type: 'success'
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

    } catch (exception) {
      setErrorMessage({
        message: 'Wrong username or password',
        type: 'error'
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const logout = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
    blogService.setToken(null)
    setErrorMessage({
      message: 'You\'re now logged out!',
      type: 'success'
    })
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(createdBlog => {
        setBlogs(blogs.concat({ ...createdBlog, user: user }))
        setErrorMessage({
          message: `New Blog: ${createdBlog.title} by ${createdBlog.author} added!`,
          type: 'success'
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const addLike = (blog) => {
    blogService
      .update(blog.id, {
        title: blog.title,
        url: blog.url,
        author: blog.author,
        likes: blog.likes + 1,
        user: blog.user.id })
      .then(updatedBlog => {
        setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : { ...updatedBlog, user: blog.user }))
        setErrorMessage({
          message: `One like added to ${updatedBlog.title}!`,
          type: 'success'
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 1500)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deleteBlog = (blogToDelete) => {
    if (window.confirm(`Do you really want to delete ${blogToDelete.title} by ${blogToDelete.author}`)) {
      blogService
        .deleteBlog(blogToDelete.id)
        .then(response => {
          setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
          setErrorMessage({
            message: `${blogToDelete.title} by ${blogToDelete.author} deleted`,
            type: 'success'
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {user === null ?
        <LoginForm handleLogin={handleLogin}/> :
        <>
          <p>{user.name} logged in <button onClick={logout}>logout</button></p>
          <Togglable buttonLabel='Add Blog' ref={blogFormRef}>
            <NewBlogForm addNewBlog={addBlog}/>
          </Togglable>
          <h2>Blog list</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} userName={user.name} />
          )}
        </>
      }
    </div>
  )
}

export default App