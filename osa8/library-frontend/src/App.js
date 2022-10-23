import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { useApolloClient } from '@apollo/client'

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

  const showrecommended = () => {
    setPage('recommended')
    
  }

  const showBooks = () => {
    setPage('books')
  }


  return (
    <div>
      <div>
        <ShowMsg msg={msg} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={showBooks}>books</button>
        {!token ? <button onClick={() => setPage('login')}>login</button> : null}
        {!token ? null : <>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={showrecommended}>recommended</button>
        <button onClick={logoutUser}>logout</button>
        </>}
      </div>

      <Authors show={page === 'authors'} setError={notification}/>
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setPage={setPage} setError={notification}/>
      <Login show={page === 'login'} setPage={setPage} setToken={setToken} setError={notification}/>
      {!token ? null : <Recommended show={page === 'recommended'} />}
    </div>
  )
}

export default App
