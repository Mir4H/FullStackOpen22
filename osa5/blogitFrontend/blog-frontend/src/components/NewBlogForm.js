import { useState } from 'react'

const NewBlogForm = ({ addNewBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    addNewBlog({
      title: title.trim(),
      author: author.trim(),
      url: url.trim()
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <br/>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Blog title..."
          />
        </div>
        <div>
          Author
          <br/>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Blog author..."
          />
        </div>
        <div>
          Url
          <br/>
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Blog URL..."
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default NewBlogForm