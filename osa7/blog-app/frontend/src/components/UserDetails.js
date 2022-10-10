import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const UserDetails = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [usersBlogs, setUsersBlogs] = useState(null)
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)
  const id = useParams().id

  useEffect(() => {
    setCurrentUser(users.find((u) => u.id === id))
  }, [users])

  useEffect(() => {
    setUsersBlogs(blogs.filter((b) => b.user.id === id))
  }, [blogs])

  if (!currentUser || !usersBlogs) {
    return null
  }
  return (
    <div>
      <h2>{currentUser.name}</h2>
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
