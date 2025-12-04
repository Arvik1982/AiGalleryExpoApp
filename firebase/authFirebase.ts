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
import { updateEmail, updatePassword, updateProfile, User } from 'firebase/auth'
import { TCredentials } from './types'

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

export const registerUser = ({ email, password }: TCredentials) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      return userCredential.user
        .getIdToken()
        .then((data) => {
          console.log({ 'LOGIN-DATA': data })
        })
        .catch((er) => {
          console.error(er.message)
        })
    }
  )
}

export const loginUser = ({ email, password }: TCredentials) => {
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      userCredential.user
        .getIdToken()
        .then((data) => {
          console.log({ 'LOGIN-DATA': data })
        })
        .catch((er) => {
          console.error(er.message)
        })
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
// Обновить профиль (displayName, photoURL)
export const updateUserProfile = async (
  user: User,
  displayName?: string,
  photoURL?: string
) => {
  await updateProfile(user, { displayName, photoURL })
}

// Обновить email
export const updateUserEmail = async (user: User, newEmail: string) => {
  await updateEmail(user, newEmail)
}

// Обновить пароль
export const updateUserPassword = async (user: User, newPassword: string) => {
  await updatePassword(user, newPassword)
}
