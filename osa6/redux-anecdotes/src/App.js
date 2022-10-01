import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdotesList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Filter/>
      <Notification/>
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App