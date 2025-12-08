import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  // @ts-ignore
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth'
import app from '../firebaseConfig'

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})
