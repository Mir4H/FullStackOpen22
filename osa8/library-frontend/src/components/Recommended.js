import { useQuery } from "@apollo/client"
import { ALL_BOOKS, CURRENT_USER } from "../queries"


const Recommended = ({show}) => {
  const userdata = useQuery(CURRENT_USER)
  const {loading, data} = useQuery(ALL_BOOKS, {
    skip: !userdata.data?.me?.favoriteGenre,
    variables: { genre: userdata.data?.me?.favoriteGenre }
  })

  if (loading || userdata.loading)  {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const books = data?.allBooks

    return (
      <div>
        <h2>Recommended books for you</h2>
        {books.length !== 0 ? 
        <>
        <p>Based on your favorite genre: {userdata.data?.me?.favoriteGenre}</p>
        <table>
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
        </table>
        </> : 
        <p>No books in your favorite genre yet.</p>}
      </div>
    )
  }
  
  export default Recommended
  