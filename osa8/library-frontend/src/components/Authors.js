import { useState } from "react"
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries"
import { useMutation } from "@apollo/client"

const Authors = ({show, authors}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS} ],
  })

  if (!show) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    editAuthor( { variables: { name, born: parseInt(born) }})

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div><label>
      name <select value={name} onChange={({ target }) => setName(target.value)}>
      {authors.map((a) => (
            <option key={a.name} value={a.name}>{a.name}</option>))}
      </select>
      </label>
      </div>
          <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
            </div>
          <button type="submit">update author</button>
      </form>
    </div>
    </div>
  )
}

export default Authors
