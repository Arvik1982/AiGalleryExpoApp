import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { auth, loginUser, registerUser } from '@/firebase/authFirebase'
import { router } from 'expo-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Button, Pressable, TextInput } from 'react-native'

const MyButton = ({
  onPressFunc,
  title,
}: {
  onPressFunc: () => Promise<string>
  title: string
}) => {
  const handlePress = () => {
    if (onPressFunc) {
      onPressFunc()
    }
  }
  return (
    <Button
      title={title}
      onPress={() => {
        handlePress()
      }}
    ></Button>
  )
}

export default function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true)
  console.log(isLoginForm)
  const handleAuthSelect = () => {
    setIsLoginForm((prev) => {
      return !prev
    })
  }
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.navigate('/(tabs)/home')
      }
    })
    return unsubscribe
  }, [])

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', gap: 8 }}>
      <ThemedView
        style={{
          height: 280,
          backgroundColor: 'white',
          borderRadius: 8,
          padding: 16,
          paddingTop: 50,
          gap: 8,
          marginBottom: 90,
        }}
      >
        <TextInput
          style={{ width: '100%', backgroundColor: 'grey', borderRadius: 8 }}
          value={email}
          onChangeText={setEmail}
          placeholder='Email'
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          textContentType='emailAddress' // работает на iOS, но не мешает Android
        />
        <TextInput
          style={{ width: '100%', backgroundColor: 'grey', borderRadius: 8 }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        ></TextInput>
        {!isLoginForm ? (
          <MyButton
            title='Register'
            onPressFunc={() => registerUser(email, password)}
          />
        ) : (
          <MyButton
            title='Login'
            onPressFunc={() => loginUser(email, password)}
          />
        )}
        <Pressable
          style={{ width: '100%', alignItems: 'center', marginTop: 8 }}
          onPress={handleAuthSelect}
        >
          <ThemedText
            style={{ textDecorationLine: 'underline', color: 'black' }}
          >
            {isLoginForm ? 'registration' : 'login'}
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  )
}
