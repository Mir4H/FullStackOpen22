import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, addLikeBlog } from '../reducers/blogsReducer'
import { useEffect, useState } from 'react'
import { addCommentBlog } from '../reducers/blogsReducer'
import {
  Link,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText
} from '@mui/material/'

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
    <Grid container={true}>
      <Grid item md={7} xs={12}>
        <h2>{currentBlog.title}</h2>
        <p>
          Link to Blog:{' '}
          <Link underline="hover" href={currentBlog.url}>
            {currentBlog.url}
          </Link>
        </p>
        <div>
          The blog has {currentBlog.likes} likes{' '}
          <Button
            id="likebutton"
            variant="outlined"
            size="small"
            onClick={likeBlog}
          >
            like
          </Button>
        </div>
        <div>
          <p>Added by {currentBlog.user.name}</p>
          {currentBlog.user.username === username ? (
            <Button variant="outlined" size="small" onClick={removeBlog}>
              remove
            </Button>
          ) : null}
        </div>
      </Grid>
      <Grid item md={5} xs={12}>
        <div>
          <h2>Comment the blog</h2>
          <p>Leave a comment</p>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ m: 1 }}
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              id="comment"
            />
            <br />

            <Button
              sx={{ m: 1 }}
              variant="outlined"
              size="medium"
              type="submit"
            >
              send
            </Button>
          </form>
        </div>
      </Grid>
      {currentBlog.comments.length !== 0 ? (
        <div>
          <Grid>
            <h2>Comments:</h2>
            <List
              sx={{
                listStyleType: 'disc'
              }}
            >
              {currentBlog.comments.map((comment) => (
                <ListItem key={comment.id} sx={{ display: 'list-item' }}>
                  <ListItemText primary={`${comment.content}`} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </div>
      ) : null}
    </Grid>
  )
}

export default BlogDetails
