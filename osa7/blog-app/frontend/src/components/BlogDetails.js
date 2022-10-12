import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, addLikeBlog } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { addCommentBlog } from '../reducers/blogsReducer'

const BlogDetails = () => {
  const [currentBlog, setCurrentBlog] = useState(null)
  const [username, setUsername] = useState(null)
  const [comment, setComment] = useState('')
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
    dispatch(addLikeBlog(currentBlog))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addCommentBlog(currentBlog, { content: comment }))
    setComment('')
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
      <div>
        <h2>Comment the blog</h2>
        <form onSubmit={handleSubmit}>
          <div>
            comment
            <input
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              id="comment"
            />
          </div>
          <button type="submit">send</button>
        </form>
      </div>
      {currentBlog.comments.length !== 0 ? (
        <div>
          <h3>Comments:</h3>
          <ul>
            {currentBlog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default BlogDetails
