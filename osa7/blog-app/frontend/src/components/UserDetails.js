import { useParams } from 'react-router-dom'

const UserDetails = ({ users, blogs }) => {
  const id = useParams().id
  const thisUser = users.filter((u) => u.id === id)
  const usersBlogs = blogs.filter((b) => b.user.id === id)

  if (!thisUser) {
    return null
  }
  return (
    <div>
      <h2>{thisUser[0].name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {usersBlogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetails
