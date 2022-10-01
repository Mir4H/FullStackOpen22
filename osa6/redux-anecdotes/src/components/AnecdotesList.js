import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotificationAsync } from '../reducers/notifyReducer'

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
    dispatch(voteAnecdote(anecdote.id))
    dispatch(showNotificationAsync(`You voted: ${anecdote.content}`))
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