import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import Blogs from './Blogs'
import { useRef } from 'react'

const Home = () => {
  const blogFormRef = useRef()
  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>
      <Blogs />
    </>
  )
}

export default Home
