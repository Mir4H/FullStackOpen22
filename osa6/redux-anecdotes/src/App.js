import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdotesList'

const App = () => {
  return (
    <div>
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App