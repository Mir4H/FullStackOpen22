import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const loginForm = () => (
  <>
  <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <br/>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <br/>
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>     
  </> 
  )

  const logout = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
    blogService.setToken(null)
    setErrorMessage({
      message: `You're now logged out!`, 
      type: "success"
      })
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const blogsToShow = () => (
    <>
    <h2>Blog list</h2>
    {blogs.map(blog => blog.user.username === user.username ?
      <Blog key={blog.id} blog={blog} /> : null
    )}
    </>
  )

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title.trim(),
      author: author.trim(),
      url: url.trim()
    }
    blogService
      .create(blogObject)
      .then(createdBlog => {
        setBlogs(blogs.concat({...createdBlog, user: user}))
        setTitle('')
        setAuthor('')
        setUrl('')
        setErrorMessage({
          message: `New Blog: ${createdBlog.title} by ${createdBlog.author} added!`, 
          type: "success"
          })
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }
  

  const newBlogForm = () => (
    <>
    <p>{user.name} logged in <button onClick={logout}>logout</button></p>
    <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <br/>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
            <br/>
            <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
            <br/>
            <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>     
    </> 
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

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
        type: "success"
        })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({
        message: 'wrong username or password', 
        type: "error"
        })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }
}

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {user !== null && newBlogForm()}
      {user !== null && blogsToShow()}
      {user === null && loginForm()}
    </div>
  )
}

export default App