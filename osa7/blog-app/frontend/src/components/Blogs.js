import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const style = {
    padding: 3,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1
  }

  return (
    <div style={style} className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const byLikes = (b1, b2) => b2.likes - b1.likes
  const sortedBlogs = [...blogs].sort(byLikes)

  return (
    <div id="blogs">
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default Blogs
