import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = ({show}) => {
  const [shownGenre, setShownGenre] = useState(null)

  const {loading, data, refetch} = useQuery(ALL_BOOKS, { 
    variables: {genre: null}
  })

  if (loading)  {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const books = data.allBooks

  const genres = books.map(book => book.genres).reduce((prev, curr) =>  prev.concat(curr), []).reduce((value, currentValue) => {
    return !value.includes(currentValue) ? [...value, currentValue] : value
  }, [])
  console.log(genres)

  const showGenre = (genre) => {
    setShownGenre(genre)
    refetch({ genre: genre })
  }

  return (
    <div>
      <h2>books</h2>
      {shownGenre ? <p>Showing books of genre: {shownGenre}</p> : null }
      {books.length !== 0 ? <table>
        <tbody>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table> : 
      <p>No books added yet. Maybe add one?</p>}
      <div>
        <h3>filter by genre:</h3>
        {genres.map((genre, index) => (
          <button onClick={() => showGenre(genre)} key={index}>{genre}</button>
        ))
      }
      <button onClick={() => refetch({ genre: null })}>All Books</button>
      </div>
    </div>
  )
}

export default Books
