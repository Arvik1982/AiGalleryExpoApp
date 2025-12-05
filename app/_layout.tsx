import { router, Stack } from 'expo-router'
import 'react-native-reanimated'

import { useAuth } from '@/firebase/useAuth'

import {
  CustomThemeProvider,
  useCustomTheme,
} from '@/context/CustomThemeContext'
import { ThemeProvider } from '@react-navigation/native'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  const { themeObject } = useCustomTheme()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log(user)
        router.replace('/(tabs)/HomeFeed') // Авторизован → tabs
      } else {
        router.replace('/') // Не авторизован → index
      }
    }
  }, [user, loading])

  return (
    <ThemeProvider value={themeObject}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: themeObject?.colors.background }}
      >
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default function RootLayout() {
  return (
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  )
}
