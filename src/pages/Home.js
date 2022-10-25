import React from 'react'
import AnimeList from '../components/AnimeList'
import SearchForm from '../components/SearchForm'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../auth/firebase'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  const logOut = () => {
    auth.signOut()
    navigate('LoginReg')
  }

  return (
    <main>
      <div className='log-out'>
        {user ? (
          <div>
            <h2 className='user'>Welcome :{user?.email}</h2>
            <button className='logOut-btn' onClick={() => logOut()}>
              Logout
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
      <SearchForm />
      <AnimeList />
    </main>
  )
}

export default Home
