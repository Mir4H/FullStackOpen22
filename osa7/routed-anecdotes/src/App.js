import { useState } from 'react'
import { Routes, Route, useNavigate, Link, useMatch } from "react-router-dom"
import  { useField } from './hooks'
import { Table, Form, Button, Alert, Navbar, Nav, Container } from 'react-bootstrap'

const Menu = () => {
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Container>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href='/' to='/' as={Link}>
              anecdotes
            </Nav.Link>
            <Nav.Link href='/create' to='/create' as={Link}>
              create new
            </Nav.Link>
            <Nav.Link href='/about' to='/about' as={Link}>
              about
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      {(message && 
      <Alert variant='success'>
        {message}
      </Alert>  
    )}
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
      {anecdotes.map(anecdote => 
        <tr key={anecdote.id} >
          <td>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </td>
        </tr>)}
      </tbody>
    </Table>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({ addNew }) => {

  const {reset: removeContent, ...content} = useField('text')
  const {reset: removeAuthor, ...author} = useField('text')
  const {reset: removeInfo, ...info} = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const resetValues = (e) => {
    e.preventDefault()
    removeContent()
    removeAuthor()
    removeInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content</Form.Label>
            <Form.Control {...content}/>
          <Form.Label>author</Form.Label>
            <Form.Control {...author} />
          <Form.Label>url for more info</Form.Label>
            <Form.Control {...info} />
          <Button variant="primary" type="submit">create</Button>
          <Button onClick={resetValues}>reset</Button>
        </Form.Group>
      </Form>
    </div>
  )

}


const ShowAnecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <p>has {anecdote.votes} votes</p><button onClick={() => vote(anecdote.id)}>vote</button>
      <p>for more info see <a href={`${anecdote.info}`}>{anecdote.info}</a></p>
    </div>
)}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')

  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`A new anecdote: ${anecdote.content} added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification}/>
      <Routes>
        <Route path='/anecdotes/:id' element={<ShowAnecdote anecdote={anecdote} vote={vote} />}></Route>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}></Route>
        <Route path='/about'element={<About />}></Route>
        <Route path='/create'element={<CreateNew addNew={addNew} />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
