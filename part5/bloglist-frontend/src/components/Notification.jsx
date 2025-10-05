const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  if (type === 'success') {
    return (
      <div className="success" style={{ color: 'green' }}>
        {message}
      </div>
    )
  }
  if (type === 'error') {
    return (
      <div className="error" style={{ color: 'red' }}>
        {message}
      </div>
    )
  }

  return <div>{message}</div>
}

export default Notification
