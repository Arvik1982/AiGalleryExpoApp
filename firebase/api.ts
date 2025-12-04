import { onValue, orderByChild, push, query, ref, set } from 'firebase/database'
import { database } from './database'

// Сохранить/обновить данные пользователя в БД
export const saveUserData = async (uid: string, data: any) => {
  await set(ref(database, `users/${uid}`), data)
}

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
