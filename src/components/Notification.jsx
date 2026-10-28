import { useEffect } from 'react'

function Notification({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  return (
    <div className={`notification ${type}`} role="alert">
      <span>{message}</span>
      <button onClick={onClose} aria-label="Close notification">×</button>
    </div>
  )
}

export default Notification
