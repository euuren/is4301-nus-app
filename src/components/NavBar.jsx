import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="navbar">
      <span className="brand">NUS</span>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/academics">Academics</NavLink>
        <NavLink to="/admission">Admission</NavLink>
      </div>
    </nav>
  )
}

export default NavBar
