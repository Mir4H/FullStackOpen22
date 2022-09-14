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
        <p key={person.id}>{person.name} {person.number} <button onClick={() => props.deletePerson(person.id)}>delete</button></p>
      ))}
    </div>
    )
  }

  export default Persons