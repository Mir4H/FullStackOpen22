import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, userName }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 8,
    backgroundColor: '#fff9f5'
  }
  const itemStyle = {
    padding: 4,
  }

  const showDetails = () => {
    setVisible(!visible)
  }


  return (
    <div style={blogStyle} className="blog">
      {visible ?
        <div id='details'>
          <div style={itemStyle} onClick={showDetails}>{blog.title} | {blog.author} <button onClick={showDetails}>Hide</button></div>
          <div style={itemStyle}>{blog.url}</div>
          <div style={itemStyle}>{blog.likes} <button onClick={() => addLike(blog)}>Like</button></div>
          <div style={itemStyle}>{blog.user.name}</div>
          {blog.user.name === userName ? <button onClick={() => deleteBlog(blog)}>Delete</button> : null}
        </div> :
        <div onClick={showDetails}>
          {blog.title} | {blog.author} <button onClick={showDetails}>View</button>
        </div>}
    </div>

  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
}


export default Blog