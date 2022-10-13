import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from '@mui/material'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const byLikes = (b1, b2) => b2.likes - b1.likes
  const sortedBlogs = [...blogs].sort(byLikes)

  return (
    <Grid item xs={10}>
      <List>
        {sortedBlogs.map((blog) => (
          <ListItemButton
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 2,
              borderRadius: 2,
              m: 1,
              p: 1
            }}
            component={Link}
            to={`/blogs/${blog.id}`}
            key={blog.id}
          >
            <ListItem>
              <ListItemText
                className="itemInlist"
                primary={`${blog.title}`}
                secondary={`${blog.author}`}
              />
              <ListItemText
                sx={{ display: { xs: 'none', md: 'grid' } }}
                align={'right'}
                primary={`added by ${blog.user.name}`}
              />
            </ListItem>
          </ListItemButton>
        ))}
      </List>
    </Grid>
  )
}

export default Blogs
