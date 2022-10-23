import { useState, useEffect } from "react"
import { useLazyQuery, useMutation } from "@apollo/client"
import { LOGIN, CURRENT_USER } from "../queries"

const Login = ({show, setPage, setToken, setError}) => {
  const [username, setUsername] = useState('')
  const password = 'secret'
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })
  const [currentUser] = useLazyQuery(CURRENT_USER, {
    fetchPolicy: 'network-only'
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      currentUser()
    }
  }, [result.data]) // eslint-disable-line

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ variables: {username, password}})
    setUsername('')
    setPage('authors')
    }
    
    if (!show) {
        return null
      }

  return (
    <div>
    <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <div>
      Username <input value={username} onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
          Password <input readOnly
            value={password}
          /></div>
          <button type="submit">login</button>
        </form>
    </div>
    )
}

export default Login