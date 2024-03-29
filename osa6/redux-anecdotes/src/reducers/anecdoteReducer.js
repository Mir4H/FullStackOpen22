import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id
      const changedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const NewAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(NewAnecdote))
  }
}

export const addLike = (anecdote) => {
  const updated = { ...anecdote, votes: anecdote.votes + 1 }
  return async dispatch => {
    const updatedLikes = await anecdoteService.addLikes(anecdote.id, updated)
    console.log(updatedLikes)
    dispatch(voteAnecdote(updatedLikes))
  }
}

export default anecdoteSlice.reducer