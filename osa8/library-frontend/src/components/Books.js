import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = ({show}) => {
  const [genreToShow, setGenreToShow] = useState(null)

  const result = useQuery(ALL_BOOKS, { 
    variables: {genre: genreToShow}
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const books = result.data.allBooks

  let genreList = []
  books.forEach(book => {
    const filteredGenres = book.genres.filter(g => genreList.indexOf(g) < 0)
    genreList = genreList.concat(filteredGenres)
  })


  return (
    <div>
      <h2>books</h2>
      {genreToShow ? <p>Showing books of genre: {genreToShow}</p> : null }
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
        {genreList.map((genre, index) => (
          <button onClick={() => setGenreToShow(genre)} key={index}>{genre}</button>
        ))
      }
      <button onClick={() => setGenreToShow(null)}>All Books</button>
      </div>
    </div>
  )
}

export default Books
