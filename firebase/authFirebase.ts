import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import app from '../firebaseConfig'

const auth = getAuth(app)

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
      return userCredential.user.getIdToken()
    }
  )
}
