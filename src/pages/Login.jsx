import { useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import Notification from '../components/Notification'

// Turns Firebase error codes into explanations the user can act on.
function getErrorMessage(code) {
  switch (code) {
    case 'auth/user-not-found':
      return 'No account exists with this email. Please check the email or sign up for a new account.'
    case 'auth/wrong-password':
      return 'Wrong password. Please try again.'
    case 'auth/invalid-credential':
      return 'Wrong credentials: the email or password is incorrect, or the account does not exist.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/missing-password':
      return 'Please enter your password.'
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please log in instead.'
    case 'auth/weak-password':
      return 'Password is too weak. It must be at least 6 characters.'
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please wait a moment and try again.'
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled before it finished.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notice, setNotice] = useState(
    location.state?.blocked
      ? { message: 'Please log in to view the Academics and Admission pages.', type: 'info' }
      : { message: '', type: '' },
  )

  const closeNotice = useCallback(() => setNotice({ message: '', type: '' }), [])

  const goToRequestedPage = () => {
    navigate(location.state?.from || '/', { replace: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      goToRequestedPage()
    } catch (error) {
      setNotice({ message: getErrorMessage(error.code), type: 'error' })
    }
  }

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      goToRequestedPage()
    } catch (error) {
      setNotice({ message: getErrorMessage(error.code), type: 'error' })
    }
  }

  return (
    <section className="login">
      <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
      <Notification message={notice.message} type={notice.type} onClose={closeNotice} />
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" className="primary">
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button onClick={handleGoogle} className="google">
        Sign in with Google
      </button>
      <p>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button className="link" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Login' : 'Sign up'}
        </button>
      </p>
    </section>
  )
}

export default Login
