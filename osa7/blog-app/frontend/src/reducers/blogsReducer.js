import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotify } from './notifyReducer'
import { initialUsers } from './usersReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addLikes(state, action) {
      const id = action.payload
      const blogToChange = state.find((b) => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: (blogToChange.likes || 0) + 1
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    appendBlogs(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    }
  }
})

export const { appendBlogs, setBlogs, addLikes, removeBlog } = blogSlice.actions

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlogs(newBlog))
      dispatch(
        setNotify(`a new blog '${content.title}' by ${content.author} added`, 5)
      )
      dispatch(initialUsers())
    } catch (error) {
      dispatch(
        setNotify(
          'creating a blog failed: ' + error.response.data.error,
          5,
          'alert'
        )
      )
    }
  }
}

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogToDelete.id)
      dispatch(removeBlog(blogToDelete.id))
      /*const updatedBlogs = await blogService.getAll()
      dispatch(setBlogs(updatedBlogs))*/
      dispatch(
        setNotify(
          `you removed '${blogToDelete.title}' by ${blogToDelete.author}`,
          5
        )
      )
    } catch (error) {
      dispatch(
        setNotify(`failed to delete '${blogToDelete.title}' `, 5, 'alert')
      )
    }
  }
}

export default blogSlice.reducer
