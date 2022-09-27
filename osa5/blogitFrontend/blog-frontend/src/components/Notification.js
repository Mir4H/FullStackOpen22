const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.type}>
      {message.message}
      <br/>
    </div>
  )
}

export default Notification