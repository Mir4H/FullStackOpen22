import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { TextField, Button } from '@mui/material/'

const NewBlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog({ title, author, url, likes: 0 }))
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            sx={{ m: 1 }}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"
            placeholder="title of the blog"
          />
        </div>
        <div>
          <TextField
            sx={{ m: 1 }}
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
            placeholder="author of the blog"
          />
        </div>
        <div>
          <TextField
            sx={{ m: 1 }}
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
            placeholder="url of the blog"
          />
        </div>
        <Button
          sx={{ m: 1 }}
          variant="outlined"
          size="medium"
          id="create-butto"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  )
}

export default NewBlogForm
