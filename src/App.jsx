import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Academics from './pages/Academics'
import Admission from './pages/Admission'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/academics"
            element={
              <ProtectedRoute>
                <Academics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admission"
            element={
              <ProtectedRoute>
                <Admission />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </AuthProvider>
  )
}

export default App
