import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { router, Stack } from 'expo-router'
import 'react-native-reanimated'

import { useAuth } from '@/firebase/useAuth'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log(user)
        router.replace('/(tabs)/home') // Авторизован → tabs
      } else {
        router.replace('/') // Не авторизован → index
      }
    }
  }, [user, loading])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </ThemeProvider>
  )
}
