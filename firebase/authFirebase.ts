import {
  createUserWithEmailAndPassword,
  // @ts-ignore
  getReactNativePersistence,
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import app from '../firebaseConfig'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const user = onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid
    // ...
  } else {
    // User is signed out
    // ...
  }
})

export const registerUser = (email = 'qqq@www2.ee', password = '123321') => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      return userCredential.user.getIdToken()
    }
  )
}

export const loginUser = (email = 'qqq@www.ee', password = '123321') => {
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      userCredential.user
        .getIdToken()
        .then((data) => {
          console.log(data)
        })
        .catch((er) => {
          console.log(er)
        })

      return userCredential.user.getIdToken()
    }
  )
}

// Выход из системы
export const logoutUser = async () => {
  try {
    await auth.signOut()
    router.replace('/')
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}
