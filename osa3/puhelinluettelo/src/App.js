import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName.trim(),
      number: newNumber.trim()
    }
    const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase().trim())
    
    if (personToUpdate) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(personToUpdate.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))})
          .then(success => {
            setNotificationMessage({
              message: `${personToUpdate.name} phonenumber updated`, 
              type: "success"
              })
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)})
          .catch(error => {
            setNotificationMessage({
              message: `${error.response.data.error}`, 
              type: "error"
            })
            setTimeout(() => {
            setNotificationMessage(null)
            }, 5000)
          })
      }
      setNewName('')
      setNewNumber('')
    } else {
      personService
        .create(personObject)
          .then(personCreated => {
            setPersons(persons.concat(personCreated))
          })
          .then(success => {
            setNotificationMessage({
              message: `${personObject.name} created`, 
              type: "success"
            })
            setTimeout(() => {
            setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationMessage({
              message: `${error.response.data.error}`, 
              type: "error"
            })
            setTimeout(() => {
            setNotificationMessage(null)
            }, 5000)
          })
        setNewName('')
        setNewNumber('')
    }
  }

  const deletePerson = id => {
    const name = persons.find(p => p.id === id)
    if (window.confirm(`Do you really want to delete ${name.name}`)) {
      personService
      .deleteFromDb(id)
        .then(
          setPersons(persons.filter(p => p.id !== id)))
        .then(success => {
          setNotificationMessage({
            message: `${name.name} deleted`, 
            type: "success"
          })
          setTimeout(() => {
          setNotificationMessage(null)
          }, 5000)})
        .catch(error => {
          setNotificationMessage({
            message: `${name.name} has already been deleted`, 
            type: "error"
          })
          setPersons(persons.filter(p => p.id !== name.id))
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)}) 
  }}

const handleNameChange = (event) => {
  setNewName(event.target.value.replace(/ +/g, " "))
}

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const handleNameFilter = (event) => {
  setSearch(event.target.value.toLowerCase())
}

return (
  <div>
    <Notification message={notificationMessage} />
    <h2>Phonebook</h2>
    <Filter handleChange={handleNameFilter}/>
    <h2>Add a new</h2>
    <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
    <h2>Numbers</h2>
    <Persons persons={persons} search={search} deletePerson={deletePerson}/>
  </div>
)}

export default App