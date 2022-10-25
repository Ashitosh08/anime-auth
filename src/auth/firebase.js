import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyBolWil2IzhLC_c8iLGEs_HJb7BWfO4rwQ',
  authDomain: 'react-auth-4d1b7.firebaseapp.com',
  projectId: 'react-auth-4d1b7',
  storageBucket: 'react-auth-4d1b7.appspot.com',
  messagingSenderId: '511376364254',
  appId: '1:511376364254:web:fe20eb64524a10c3b4284f',
  measurementId: 'G-7W94B0X8M5',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
export { auth, db }
