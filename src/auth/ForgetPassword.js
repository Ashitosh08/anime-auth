import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import './LoginReg.css'
function ForgetPassword() {
  const [details, setDetails] = useState({ email: '' })
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (details.email) {
      console.log(details)
      setError('Password reset email sent to your email')
      setDetails({ email: '', password: '' })
    } else {
      console.log('all fields are required')
      setError('Please provide a valid email !!!')
    }
  }

  return (
    <div className='container-reset'>
      <div className='text-center m-5-auto '>
        <div className='reset'>
          <h2 style={{ margin: '20px 0', color: 'rgb(176, 149, 149)' }}>
            Reset your password
          </h2>
          <h5>Enter your email address</h5>
          <form action='/login' onSubmit={handleSubmit}>
            <p>
              <label id='reset_pass_lbl'>Email address</label>
              <br />
              <input
                type='email'
                name='email'
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                value={details.email}
              />
            </p>
            <p>
              <button className='sub-btn' type='submit'>
                Reset Password
              </button>
            </p>
          </form>
          <footer>
            <p>
              <Link to='/' className='link-page'>
                Back to Homepage
              </Link>
            </p>
          </footer>
          {error !== '' ? <div className='error'>{error}</div> : <p>{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
