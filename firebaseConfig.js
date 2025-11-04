import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyABcX_WEk7rG0D2_nrndpaCk7glKNWkpbg',
  authDomain: 'ai-app-expo.firebaseapp.com',
  databaseURL: 'https://ai-app-expo-default-rtdb.firebaseio.com',
  projectId: 'ai-app-expo',
  storageBucket: 'ai-app-expo.firebasestorage.app',
  messagingSenderId: '654599477445',
  appId: '1:654599477445:android:fd1f0333e420015cea38ac',
}

const app = initializeApp(firebaseConfig)
export default app
