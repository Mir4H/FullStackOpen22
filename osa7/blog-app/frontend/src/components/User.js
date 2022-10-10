import userService from '../services/user'
import { useDispatch, useSelector } from 'react-redux'
import { userData } from '../reducers/userReducer'
import { setNotify } from '../reducers/notifyReducer'

const User = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const logout = () => {
    dispatch(userData(null))
    userService.clearUser()
    dispatch(setNotify('good bye!', 5))
  }
  return (
    <div>
      <h1>blogs</h1>
      {user.name} logged in
      <button onClick={logout}> logout</button>
    </div>
  )
}
export default User
