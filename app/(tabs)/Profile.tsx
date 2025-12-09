import ParallaxScrollView from '@/components/parallax-scroll-view'
import {
  addTraining,
  getUserData,
  logoutUser,
  saveUserData,
} from '@/firebase/api'

import { useAuth } from '@/firebase/useAuth'
import { useEffect, useState } from 'react'
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export default function ProfileScreen() {
  const { user } = useAuth()
  const [userDataState, setUserDataState] = useState({})

  const userData = async (uid: string | undefined) => {
    if (uid === undefined) return
    const res = await getUserData(uid)
    setUserDataState(res)
  }
  useEffect(() => {
    userData(user?.uid)
    console.log({ userDataState })
  }, [user?.uid])

  const [val, setVal] = useState('')

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <>
          <Image
            source={{ uri: user?.photoURL }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              alignSelf: 'center',
              backgroundColor: 'red',
              marginTop: 20, // Добавьте отступ сверху
            }}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              marginVertical: 10,
            }}
          >
            {user?.displayName || 'Без имени'}
          </Text>
        </>
      }
    >
      {/* Весь контент должен быть внутри ThemedView или View */}

      <Text
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'grey',
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        📧 {user?.email || 'Не указан'}
      </Text>
      <Text
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'grey',
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        📱 {user?.phoneNumber || 'Не указан'}
      </Text>
      <Text
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'grey',
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        ID: {user?.uid?.slice(0, 8)}...
      </Text>
      <TouchableOpacity>
        <Text style={{ color: 'blue' }}>Редактировать</Text>
      </TouchableOpacity>

      <TextInput
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'grey',
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
        value={val}
        onChangeText={setVal}
        placeholder='Введите что-то...'
      />

      <View style={{ width: '100%', marginBottom: 10 }}>
        <Button
          onPress={() => user && saveUserData(user.uid, { val })}
          title='SEND'
        />
      </View>

      <View style={{ width: '100%', marginBottom: 10 }}>
        <Button
          title='TRAINING'
          onPress={() =>
            user &&
            addTraining(user?.uid, {
              date: '2025-12-05',
              duration: 60,
              notes: 'Отличная сессия',
            })
          }
        />
      </View>

      <View style={{ width: '100%', marginBottom: 10 }}>
        <Button title='EXIT' onPress={logoutUser} />
      </View>
      <View style={{ width: '100%', marginBottom: 10 }}>
        <Button title='EXIT' onPress={logoutUser} />
      </View>
      <View style={{ width: '100%', marginBottom: 10 }}>
        <Button title='EXIT' onPress={logoutUser} />
      </View>
      <View style={{ width: '100%', marginBottom: 10 }}>
        <Button title='EXIT' onPress={logoutUser} />
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
})
