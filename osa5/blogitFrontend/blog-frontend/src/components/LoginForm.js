import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          Username
          <br/>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <br/>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm