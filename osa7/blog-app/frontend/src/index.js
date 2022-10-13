import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import store from './store'
import { Container, Stack } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Container>
        <Stack container="true">
          <App />
        </Stack>
      </Container>
    </Router>
  </Provider>
)
