import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import { auth } from '../auth/firebase'

const Navbar = () => {
  const [user] = useAuthState(auth)

  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <Link to='/'>
          <h1 className='logo header'>Anime </h1>
        </Link>
        <ul className='nav-links'>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            <Link to='/watchlist'>Watchlist</Link>
          </li>
          <li>
            <Link to='/LoginReg'>{!user? 'Login/Signup' :'' }</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
