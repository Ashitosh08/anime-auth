import React, { useState } from 'react'
// import './auth/LoginReg.css'
import Register from './Register'
import UserLogin from './UserLogin'
function LoginReg() {
  const [toggle, setToggle] = useState(1)

  const toggleTab = (index) => {
    setToggle(index)
  }

  return (
    <div className='container'>
      <div className='bloc-tabs'>
        <button
          className={toggle === 1 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(1)}
        >
          Login
        </button>
        <button
          className={toggle === 2 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(2)}
        >
          Signup
        </button>
      </div>

      <div className='content-tabs'>
        <div className={toggle === 1 ? 'content  active-content' : 'content'}>
          <UserLogin />
        </div>

        <div className={toggle === 2 ? 'content  active-content' : 'content'}>
          <Register />
        </div>
      </div>
    </div>
  )
}

export default LoginReg
