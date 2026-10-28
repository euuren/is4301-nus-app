import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <p>Loading...</p>
  }

  if (!user) {
    // Send the user to login, remembering which page they wanted.
    return <Navigate to="/login" replace state={{ from: location.pathname, blocked: true }} />
  }

  return children
}

export default ProtectedRoute
