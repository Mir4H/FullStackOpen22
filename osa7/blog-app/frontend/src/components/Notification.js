import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification.message === null) {
    return null
  }

  return (
    <div id="notification">
      <Alert severity={notification.style === 'alert' ? 'error' : 'success'}>
        {notification.message}
      </Alert>
    </div>
  )
}

export default Notification
