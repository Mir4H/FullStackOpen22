import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, addLikes } from '../reducers/blogsReducer'
import { setNotify } from '../reducers/notifyReducer'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const BlogDetails = () => {
  const [currentBlog, setCurrentBlog] = useState(null)
  const [username, setUsername] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setCurrentBlog(blogs.find((b) => b.id === id))
  }, [blogs])

  useEffect(() => {
    setUsername(user.username)
  }, [user])

  const removeBlog = () => {
    const ok = window.confirm(
      `remove '${currentBlog.title}' by ${currentBlog.author}?`
    )
    if (!ok) {
      return
    }
    dispatch(deleteBlog(currentBlog))
    navigate('/')
  }

  const likeBlog = () => {
    dispatch(addLikes(currentBlog.id))
    dispatch(
      setNotify(`you liked '${currentBlog.title}' by ${currentBlog.author}`, 5)
    )
  }

  if (!currentBlog || !username) {
    return null
  }

  return (
    <div>
      <h2>{currentBlog.title}</h2>
      <p>
        Link to Blog: <a href={currentBlog.url}>{currentBlog.url}</a>
      </p>
      <div>
        The blog has {currentBlog.likes} likes{' '}
        <button onClick={likeBlog}>like</button>
      </div>
      <div>
        <p>Added by {currentBlog.user.name}</p>
        {currentBlog.user.username === username ? (
          <button onClick={removeBlog}>remove</button>
        ) : null}
      </div>
    </div>
  )
}

export default BlogDetails
