import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userEmail')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky">
        <div className="container-fluid">
          <label className="navbar-brand" href="#">Curry Leaves</label>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/myorders">My Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/' onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
