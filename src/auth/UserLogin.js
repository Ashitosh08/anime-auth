import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'
import { useForm } from 'react-hook-form'
import './LoginReg.css'

function UserLogin() {
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm()

  const [details, setDetails] = useState({ email: '', password: '' })
  const [error, setError] = useState(false)

  const signIn = () => {
    signInWithEmailAndPassword(auth, details.email, details.password)
      .then((auth) => {
        navigate('/')
        console.log(auth)
      })
      .catch((error) => console.log(error))
  }

  const navigate = useNavigate()
  const onSubmit = (e) => {
    e.preventDefault()
    if (details.email && details.password) {
      console.log(details)
      setError('Login success')
      setDetails({ email: '', password: '' })
      navigate('/')
    } else {
      console.log('all fields are required')
      setError('All fields are required !!!')
    }
  }

  const registerPassword = {
    ...register('password', { required: 'Password is required' }),
  }

  const registerEmail = {
    ...register('email', {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address',
      },
    }),
  }

  return (
    <>
      <div className='text-center m-1-auto'>
        <h2>Sign in</h2>
        {/* Error */}
        {error !== '' ? <div className='error'>{error}</div> : <p>{error}</p>}

        <form action='' className='user-form' onSubmit={handleSubmit(onSubmit)}>
          <p>
            <label className='label'>Email address</label>
            <br />

            <input
              type='email'
              name='email'
              className={`form-control ${errors.name && 'invalid'}`}
              onChange={(e) =>
                setDetails(
                  { ...details, email: e.target.value },
                  registerEmail.onChange(e)
                )
              }
              // onKeyUp={() => {
              //   trigger('email')
              // }}
              value={details.email}
              // required
            />
          </p>
          {errors.email && (
            <small className='text-danger'>{errors.email.message}</small>
          )}
          <p>
            <label className='label'>Password</label>
            <br />
            <input
              type='password'
              name='password'
              // required
              onChange={(e) =>
                setDetails(
                  { ...details, password: e.target.value },
                  registerPassword.onChange(e)
                )
              }
              // onKeyUp={() => {
              //   trigger('email')
              // }}
              value={details.password}
            />
          </p>
          {errors.password && (
            <small className='text-danger'>{errors.password.message}</small>
          )}
          <Link to='/ForgetPassword'>
            <label className='right-label'>Forget password?</label>
          </Link>
          <p>
            <button id='sub_btn' type='submit' onClick={signIn}>
              Login
            </button>
          </p>
        </form>
        <footer>
          <p>
            First time?
            <Link to='/LoginReg'>
              <span className='link-page'>Create an account </span>
            </Link>
            .
          </p>
          <p>
            <Link to='/' className='link-page'>
              Back to Homepage
            </Link>
            .
          </p>
        </footer>
      </div>
    </>
  )
}

export default UserLogin
