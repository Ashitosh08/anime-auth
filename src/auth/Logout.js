import React from 'react'

function Logout() {
  const handleLogout = () => {
    console.log('logout')
  }

  return <div onClick={handleLogout}>Logout</div>
}

export default Logout
