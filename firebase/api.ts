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
import { database } from './database'

// | Метод                    | Действие              | Перезапись всего объекта? |
// | ------------------------ | --------------------- | ------------------------- |
// | set(data)                | Полная замена         | ✅ Да studyraid​           |
// | update(updates)          | Только указанные поля | ❌ Нет                     |
// | set(data, {merge: true}) | Слияние               | ❌ Нет                     |

// Сохранить/обновить данные пользователя в БД
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
