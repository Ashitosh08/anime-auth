import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase'
import './LoginReg.css'
import { useForm } from 'react-hook-form'
function Register() {
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm()

  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState(false)

  const signUp = () => {
    createUserWithEmailAndPassword(auth, details.email, details.password)
      .then((auth) => {
        navigate('/')
      })
      .catch((error) => console.log(error))
  }

  const navigate = useNavigate()
  const onSubmit = (e) => {
    e.preventDefault()
    if (
      details.email &&
      details.name &&
      details.password &&
      details.confirmPassword
    ) {
      if (details.password === details.confirmPassword) {
        console.log(details)
        setError(`Registration successful`)
        setDetails({ name: '', email: '', password: '', confirmPassword: '' })
        navigate('/')
      }
      setError(`Password and confirm password doesn't match`)
    } else {
      console.log('all fields are required')
      setError('All fields are required !!!')
    }
  }

  // register useForm

  const registerName = { ...register('name', { required: 'Name is required' }) }

  const registerEmail = {
    ...register('email', {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address',
      },
    }),
  }

  const registerPassword = {
    ...register('password', { required: 'Password is required' }),
  }

  const registerConfirmPassword = {
    ...register('confirmPwd', {
      required: 'Confirm Password is required',
    }),
  }

  return (
    <div>
      <div className='text-center m-1-auto'>
        <h5>Create your account</h5>
        {/* Error */}
        {error !== '' ? <div className='error'>{error}</div> : ''}
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>
            <label>Username</label>
            <br />
            <input
              type='text'
              name='name'
              className={`form-control ${errors.name && 'invalid'}`}
              onChange={(e) =>
                setDetails(
                  { ...details, name: e.target.value },
                  registerName.onChange(e)
                )
              }
              value={details.name}
              // {...register('name', { required: 'Name is required' })}
            />
          </p>
          {errors.name && (
            <small className='text-danger'>{errors.name.message}</small>
          )}
          <p>
            <label>Email address</label>
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
              value={details.email}
              onKeyUp={() => {
                trigger('email')
              }}
              // {...register('email', {
              //   required: 'Email is required',
              //   pattern: {
              //     value: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
              //     message: 'Invalid email address',
              //   },
              // })}
            />
          </p>
          {errors.email && (
            <small className='text-danger'>{errors.email.message}</small>
          )}
          <p>
            <label>Password</label>
            <br />
            <input
              type='password'
              name='password'
              className={`form-control ${errors.name && 'invalid'}`}
              onChange={(e) =>
                setDetails(
                  { ...details, password: e.target.value },
                  registerPassword.onChange(e)
                )
              }
              value={details.password}
              // {...register('password', { required: 'Password is required' })}
            />
          </p>
          {errors.password && (
            <small className='text-danger'>{errors.password.message}</small>
          )}
          <p>
            <label>Confirm Password</label>
            <br />
            <input
              type='password'
              name='confirmPassword'
              className={`form-control ${errors.name && 'invalid'}`}
              onChange={(e) =>
                setDetails(
                  { ...details, confirmPassword: e.target.value },
                  registerConfirmPassword.onChange(e)
                )
              }
              value={details.confirmPassword}
            />
          </p>
          {errors.password && (
            <small className='text-danger'>{errors.confirmPwd.message}</small>
          )}
          <p>
            <input type='checkbox' name='checkbox' id='checkbox' required />{' '}
            <span>
              I agree all statements in{' '}
              <a href='https://google.com'>terms of service</a>
            </span>
            .
          </p>
          <p>
            <button id='sub_btn' type='submit' onClick={signUp}>
              Register
            </button>
          </p>
        </form>
        <footer>
          <p>
            <Link to='/' className='link-page'>
              Back to Homepage
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Register
