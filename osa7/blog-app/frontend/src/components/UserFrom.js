import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../reducers/usersReducer'
import { TextField, Button } from '@mui/material/'

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
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ m: 1 }}
          label="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          id="usernameInput"
        />
        <TextField
          sx={{ m: 1 }}
          label="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
          id="nameInput"
        />
        <TextField
          sx={{ m: 1 }}
          label="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          id="passwordInput"
        />
        <Button
          sx={{ m: 1 }}
          variant="outlined"
          size="medium"
          id="create-button"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  )
}

export default UserForm
