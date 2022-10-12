import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotify } from './notifyReducer'
import { initialUsers } from './usersReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const id = action.payload.id
      return state.map((blog) => (blog.id !== id ? blog : action.payload))
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

export const { appendBlogs, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addLikeBlog = (blogToLike) => {
  return async (dispatch) => {
    const changedLikes = {
      likes: blogToLike.likes + 1
    }
    try {
      const likedBlog = await blogService.update(blogToLike.id, changedLikes)
      dispatch(updateBlog(likedBlog))
      dispatch(
        setNotify(`you liked '${blogToLike.title}' by ${blogToLike.author}`, 5)
      )
    } catch (error) {
      dispatch(
        setNotify(
          'failed to add like: ' + error.response.data.error,
          5,
          'alert'
        )
      )
    }
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

export const addCommentBlog = (blog, comment) => {
  return async (dispatch) => {
    try {
      const updated = await blogService.addComment(blog.id, comment)
      dispatch(updateBlog(updated))
      dispatch(setNotify(`you commented '${blog.title}' by ${blog.author}`, 5))
    } catch (error) {
      dispatch(setNotify(`failed to comment: ${blog.title}`, 5, 'alert'))
    }
  }
}

export default blogSlice.reducer
