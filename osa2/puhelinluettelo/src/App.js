import { useState } from 'react'

const Filter = (props) => (
<div> 
  Filter shown with: <input onChange={props.handleChange}/>
</div>
)

const Form = (props) => (
  <form onSubmit={props.addPerson}>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input 
          value={props.newNumber}
          onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

const Persons = (props) => {
  const filteredPersons = props.persons.filter((person) => {
    if (props.search === "") {
      return person
    }
    else {
      return person.name.toLowerCase().includes(props.search)
    }
  })
  return (
    <div>
    {filteredPersons.map((person) => (
      <p key={person.name}>{person.name} {person.number}</p>
    ))}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } 
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleNameFilter}/>
      <h2>Add a new</h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} search={search}/>
    </div>
  )

}

export default App