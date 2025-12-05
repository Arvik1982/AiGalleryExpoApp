import { useCustomTheme } from '@/context/CustomThemeContext'
import { Tabs } from 'expo-router'
import { Home, MessageSquare, PlusSquare, Settings } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

export default function TabLayout() {
  const { themeObject } = useCustomTheme()

  return (
    <Tabs
      screenOptions={{
        header: ({ options, route }) => (
          <View
            style={{
              height: 60,
              backgroundColor: 'red',
              justifyContent: 'center',
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: 'white',
                includeFontPadding: false,
              }}
            >
              {options.title ?? route.name}
            </Text>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name='HomeFeed'
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='Profile'
        options={{
          headerShown: true,
          title: 'Profile',
          href: null,
          tabBarIcon: ({ color }) => <Settings size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='CreateAR'
        options={{
          title: '',
          tabBarIcon: ({ color }) => <PlusSquare size={30} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='ChatBot'
        options={{
          title: 'CHB',
          tabBarIcon: ({ color }) => <MessageSquare size={28} color={color} />,
          headerShown: true,
        }}
      />
    </Tabs>
  )
}
