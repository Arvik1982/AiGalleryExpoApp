import { useCustomTheme } from '@/context/CustomThemeContext'
import { Tabs } from 'expo-router'
import {
  BellIcon,
  Home,
  MessageSquare,
  PlusSquare,
  User,
} from 'lucide-react-native'
import React from 'react'

export default function TabLayout() {
  const { themeObject } = useCustomTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: themeObject?.colors.tabIconSelected,
        tabBarInactiveTintColor: themeObject?.colors.tabIconDefault,
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
          paddingBottom: 0,
          backgroundColor: themeObject?.colors.background,
        },
      }}
    >
      <Tabs.Screen
        name='HomeFeed'
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='Notifications'
        options={{
          title: '',
          tabBarIcon: ({ color }) => <BellIcon size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name='CreateAR'
        options={{
          title: '',
          tabBarIcon: ({ color }) => <PlusSquare size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name='ChatBot'
        options={{
          title: '',
          tabBarIcon: ({ color }) => <MessageSquare size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='Profile'
        options={{
          title: '',
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  )
}
