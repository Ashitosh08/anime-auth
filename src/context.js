import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './auth/firebase'
const AppContext = React.createContext()

const getLocalStorage = (user) => {
  let watchlist = localStorage.getItem(user?.uid)
  if (watchlist) {
    return JSON.parse(watchlist)
  }
  return []
}

const AppProvider = ({ children }) => {
  const [user] = useAuthState(auth)
  const [loading, setLoading] = useState(true)
  const [animeInfo, setAnimeInfo] = useState()
  const [searchTerm, setSearchTerm] = useState('naruto')
  const [animes, setAnimes] = useState([])
  const [watchlist, setWatchlist] = useState([])

  React.useEffect(() => {
    var data = getLocalStorage(user)
    setWatchlist(data)
  }, [user])

  const fecthAnimes = useCallback(async () => {
    setLoading(true)

    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${searchTerm.toLowerCase()}&limit=10`
    )
    const respdata = await response.json()

    if (respdata.data) {
      const newAnimes = respdata.data.map((item) => {
        const {
          images,
          title,
          rating,
          url,
          mal_id,
          synopsis,
          character,
          episodes,
          aired,
        } = item

        return {
          synopsis,
          character,
          episodes,
          aired: aired,
          url,
          id: mal_id,
          title: title,
          images: images,
          rating: rating,
        }
      })
      setAnimes(newAnimes)
    } else {
      setAnimes([])
    }
    setLoading(false)
  }, [searchTerm])

  useEffect(() => {
    fecthAnimes()
  }, [searchTerm, fecthAnimes])

  function saveWatchList(data) {
    localStorage.setItem(user?.uid, JSON.stringify(data))
    setWatchlist(data)
    console.log(data)
  }

  return (
    <AppContext.Provider
      value={{
        loading,
        animeInfo,
        setAnimeInfo,
        animes,
        watchlist,
        setWatchlist: saveWatchList,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
