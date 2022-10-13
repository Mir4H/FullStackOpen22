import UserForm from './UserFrom'
import { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { TextField, Button, Stack, Grid } from '@mui/material/'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <Grid container>
          <Grid item md={6}>
            <Stack>
              <h2>{visible ? 'Create account' : 'Log in to application'}</h2>
              <p>
                {visible
                  ? 'Already have an account?'
                  : "Don't have an account yet?"}
              </p>
              <Button
                variant="outlined"
                size="medium"
                onClick={() => setVisible(!visible)}
              >
                {visible ? 'Login' : 'Create account'}
              </Button>
            </Stack>
          </Grid>
          <Grid item md={6}>
            {visible ? (
              <UserForm />
            ) : (
              <form onSubmit={handleSubmit}>
                <TextField
                  sx={{ m: 1 }}
                  label="username"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                  id="username"
                />

                <TextField
                  sx={{ m: 1 }}
                  label="password"
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  id="password"
                />

                <Button
                  sx={{ m: 1 }}
                  variant="outlined"
                  size="medium"
                  id="login-button"
                  type="submit"
                >
                  login
                </Button>
              </form>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LoginForm
