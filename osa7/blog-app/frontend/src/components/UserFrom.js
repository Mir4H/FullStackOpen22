import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../reducers/usersReducer'

const UserForm = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createUser({ username, name, password }))
    setUsername('')
    setName('')
    setPassword('')
  }
  return (
    <div>
      <h2>Create account</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="usernameInput"
          />
        </div>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
            id="nameInput"
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="passwordInput"
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default UserForm
