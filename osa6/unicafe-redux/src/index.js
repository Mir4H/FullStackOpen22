import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const text = {
    fontSize: 22,
    marginLeft: 5,
  }

  const buttons = {
    margin: 5, 
    padding: 5
  }

  return (
    <div>
      <div style={text}>Good: {store.getState().good}</div>
      <div style={text}>OK: {store.getState().ok}</div>
      <div style={text}>Bad: {store.getState().bad}</div>
      <button style={buttons} onClick={good}>good</button>
      <button style={buttons} onClick={ok}>ok</button>
      <button style={buttons} onClick={bad}>bad</button><br/>
      <button style={buttons} onClick={zero}>reset stats</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)