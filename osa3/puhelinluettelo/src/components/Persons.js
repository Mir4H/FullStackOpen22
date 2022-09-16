const Persons = ({ persons, search, deletePerson }) => {
    const filteredPersons = persons.filter((person) => {
      if (search === "") {
        return person
      }
      else {
        return person.name.toLowerCase().includes(search)
      }
    })
    return (
      <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></p>
      ))}
    </div>
    )
  }

  export default Persons