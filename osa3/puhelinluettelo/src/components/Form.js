import React from 'react'

const Form = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={addPerson}>
    <div className="inputField">
            Name: <input
        value={newName}
        onChange={handleNameChange}/>
    </div>
    <div className="inputField">
            Number: <input
        value={newNumber}
        onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
)

export default Form