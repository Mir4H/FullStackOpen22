import { useState } from "react"

const Blog = ({ blog, addLike, deleteBlog, user }) => {

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
    <div style={blogStyle}>
    {visible ? 
    <div>
    <div style={itemStyle} onClick={showDetails}>{blog.title} | {blog.author} <button onClick={showDetails}>Hide</button></div>
    <div style={itemStyle}>{blog.url}</div>
    <div style={itemStyle}>{blog.likes} <button onClick={() => addLike(blog)}>Like</button></div>
    <div style={itemStyle}>{blog.user.name}</div>
    {blog.user.name === user ? <button onClick={() => deleteBlog(blog)}>Delete</button> : null}
  </div> : 
  <div onClick={showDetails}>
    {blog.title} | {blog.author} <button onClick={showDetails}>View</button>
  </div>}
  </div>
      
  )
}
  
  export default Blog