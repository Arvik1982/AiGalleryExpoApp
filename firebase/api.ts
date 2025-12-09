import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
} from 'firebase/auth'

import { router } from 'expo-router'
import {
  get,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  set,
  update,
} from 'firebase/database'
import { auth } from './authFirebase'
import { database } from './database'
import { TCredentials } from './types'

// | Метод                    | Действие              | Перезапись всего объекта? |
// | ------------------------ | --------------------- | ------------------------- |
// | set(data)                | Полная замена         | ✅ Да studyraid​           |
// | update(updates)          | Только указанные поля | ❌ Нет                     |
// | set(data, {merge: true}) | Слияние               | ❌ Нет                     |

export const registerUser = ({ email, password }: TCredentials) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user
      const idTokenResult = await user.getIdTokenResult()

      // Сохраняем профиль пользователя в Realtime Database
      await saveUserData(user.uid, {
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        emailVerified: user.emailVerified,
        createdAt: new Date().toISOString(),
        lastSignIn: user.metadata.lastSignInTime,
        idToken: idTokenResult.token, // если нужен токен в БД
      })

      console.log({
        'REGISTER-USER': user.uid,
        'ID-TOKEN': idTokenResult.token,
      })
      return user // возвращаем пользователя для дальнейшего использования
    })
    .catch((error) => {
      console.error('Registration error:', error.message)
      throw error // пробрасываем ошибку дальше
    })
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

// Сохранить/заменить данные пользователя в БД
export const saveUserData = async (uid: string, data: any) => {
  await set(ref(database, `users/${uid}`), data)
}

// Получить профиль пользователя
export const getUserData = async (uid: string) => {
  const userRef = ref(database, `users/${uid}`)
  const snapshot = await get(userRef)
  return snapshot.exists() ? snapshot.val() : null
}

// Подписка на изменения (аналог onSnapshot)
export const onUserData = (uid: string, callback: (data: any) => void) => {
  const userRef = ref(database, `users/${uid}`)
  return onValue(userRef, (snapshot) => {
    callback(snapshot.val())
  })
}

// Обновить отдельные поля профиля
export const updateUserData = async (uid: string, updates: Partial<any>) => {
  const userRef = ref(database, `users/${uid}`)
  await update(userRef, updates) // НЕ перезаписывает весь объект!
}

// Пример использования:
// await updateUserData(userId, {
//   displayName: 'Новое имя',
//   lastTraining: new Date().toISOString()
// })

// Добавить тренировку (на корневом уровне)
export const addTraining = async (
  uid: string,
  trainingData: { date: string; duration: number; notes?: string }
) => {
  const trainingListRef = ref(database, `training/${uid}`)
  const trainingRef = push(trainingListRef)

  await set(trainingRef, {
    ...trainingData,
    createdAt: new Date().toISOString(),
  })
  console.log('TRRRRR')
  return trainingRef.key
}

// Получить тренировки пользователя
export const getUserTrainings = (
  uid: string,
  callback: (trainings: any[]) => void
) => {
  const trainingsRef = ref(database, `training/${uid}`)
  const trainingsQuery = query(trainingsRef, orderByChild('date'))

  return onValue(trainingsQuery, (snapshot) => {
    const trainings: any[] = []
    snapshot.forEach((child) => {
      trainings.push({ id: child.key, ...child.val() })
    })
    callback(trainings.reverse()) // новые сверху
  })
}

// Удалить тренировку
export const deleteTraining = async (uid: string, trainingId: string) => {
  await set(ref(database, `training/${uid}/${trainingId}`), null)
}
