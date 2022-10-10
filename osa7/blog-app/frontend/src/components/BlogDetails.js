import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteBlog, addLikes } from '../reducers/blogsReducer'
import { setNotify } from '../reducers/notifyReducer'
import { useNavigate } from 'react-router-dom'

const BlogDetails = ({ blogs, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blog = blogs.filter((b) => b.id === id)

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id)
    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    )

    if (!ok) {
      return
    }
    dispatch(deleteBlog(toRemove))
    navigate('/')
  }

  const likeBlog = (blog) => {
    dispatch(addLikes(blog.id))
    dispatch(setNotify(`you liked '${blog.title}' by ${blog.author}`, 5))
  }
  console.log(blog)
  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog[0].title}</h2>
      <p>
        Link to Blog: <a href={blog[0].url}>{blog[0].url}</a>
      </p>
      <div>
        The blog has {blog[0].likes} likes{' '}
        <button onClick={() => likeBlog(blog[0])}>like</button>
      </div>
      <div>
        <p>Added by {blog[0].user.name}</p>
        {blog[0].user.name === user.name ? (
          <button onClick={() => removeBlog(blog[0].id)}>remove</button>
        ) : null}
      </div>
    </div>
  )
}

export default BlogDetails

/*
      <div>
        {blog.likes} likes{' '}
        <button onClick={() => likeBlog(blog.id)}>like</button>
      </div>
      {own && <button onClick={() => removeBlog(blog.id)}>remove</button>}
      */
