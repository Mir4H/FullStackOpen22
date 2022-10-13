import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import Blogs from './Blogs'
import { useRef } from 'react'
import { Grid } from '@mui/material'

const Home = () => {
  const blogFormRef = useRef()

  return (
    <>
      <Grid container={true} justifyContent="center">
        <Grid item xs={10}>
          <h2>Blog list</h2>
          <p>List of Blogs added by users</p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm blogFormRef={blogFormRef} />
          </Togglable>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Blogs />
      </Grid>
    </>
  )
}

export default Home
