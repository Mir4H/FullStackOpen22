import { useSelector, useDispatch } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'
import { setNotify } from '../reducers/notifyReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes} votes<br/>
        <button onClick={() => vote(anecdote.id)}>vote</button></div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const search = useSelector(state => state.filtering.filterBy)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const filteredAnecdotes = sortedAnecdotes.filter((item) => item.content.toLowerCase().includes(search))

  const vote = (anecdote) => {
    console.log(anecdote)
    dispatch(addLike(anecdote))
    dispatch(setNotify(`You voted: ${anecdote.content}`, 5))
  }

  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={() => vote(anecdote)
          }/>
      )}
    </div>
  )
}

export default Anecdotes