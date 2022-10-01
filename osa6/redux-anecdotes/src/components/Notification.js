import { useSelector } from 'react-redux'

const Notification = (props) => {
  const notification = useSelector(state => state.notification.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!notification) {
    return null
  } else {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification