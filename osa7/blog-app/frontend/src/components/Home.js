import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import Blogs from './Blogs'
import { useRef } from 'react'

const Home = () => {
  const blogFormRef = useRef()
  return (
    <>
      <h2>Blog list</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>
      <Blogs />
    </>
  )
}

export default Home
