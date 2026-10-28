import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Academics from './pages/Academics'
import Admission from './pages/Admission'
import './App.css'

function App() {
  return (
    <>
      <NavBar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admission" element={<Admission />} />
        </Routes>
      </main>
    </>
  )
}

export default App
