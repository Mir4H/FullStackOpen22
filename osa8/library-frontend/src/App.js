import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import { useSubscription, useApolloClient } from '@apollo/client'

const ShowMsg = ({ msg }) => {
  if (!msg) {
    return null
  }
  return <div style={{ color: 'red' }}>{msg}</div>
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [msg, setMsg] = useState('')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()

  const notification = (message) => {
    setMsg(message)
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }

  const logoutUser = () => {
    setPage('authors')
    setToken(null)
    localStorage.clear()
    client.resetStore()

  }
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded
      notification(`${bookAdded.title} added`)

      client.cache.updateQuery({ query: ALL_BOOKS, variables: {genre: null} }, ({allBooks}) => {
        return {
          allBooks: allBooks.concat(bookAdded),
        }
      })
    }
  })

  return (
    <div>
      <div>
        <ShowMsg msg={msg} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? <button onClick={() => setPage('login')}>login</button> : null}
        {!token ? null : <>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={(logoutUser)}>logout</button>
        </>}
      </div>

      <Authors show={page === 'authors'} setError={notification} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setPage={setPage} setError={notification}/>
      <Login show={page === 'login'} setPage={setPage} setToken={setToken} setError={notification}/>
      {!token ? null : <Recommended show={page === 'recommended'} />}
    </div>
  )
}

export default App
