import { ThemedView } from '@/components/themed-view'
import { useCustomTheme } from '@/context/CustomThemeContext'
import { HeaderBackButtonProps } from '@react-navigation/elements'
import { router, Tabs } from 'expo-router'
import {
  ChevronLeft,
  Home,
  MessageSquare,
  PlusSquare,
  Settings,
} from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function TabLayout() {
  const { themeObject } = useCustomTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeObject?.colors.tabIconSelected,
        tabBarInactiveTintColor: themeObject?.colors.tabIconDefault,
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
          paddingBottom: 0,
          backgroundColor: themeObject?.colors.background,
        },

        header: ({ options, route }) => (
          <ThemedView
            style={{
              height: 80,
              justifyContent: 'flex-start',
              paddingHorizontal: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {
              <View style={{ width: 50 }}>
                {options.headerLeft?.({
                  tintColor: themeObject?.colors.tint,
                  pressColor: 'transparent',
                  pressOpacity: 0.7,
                  canGoBack: true,
                })}
              </View>
            }

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
            {
              <View style={{ width: 50 }}>
                {options.headerRight?.({
                  tintColor: themeObject?.colors.tint,
                  pressColor: 'transparent',
                  pressOpacity: 0.7,
                  canGoBack: false,
                })}
              </View>
            }
          </ThemedView>
        ),
      }}
    >
      <Tabs.Screen
        name='HomeFeed'
        options={{
          headerRight: (props: HeaderBackButtonProps) => {
            return (
              <TouchableOpacity
                style={{
                  width: '100%',
                }}
                onPress={() => {
                  router.navigate('/(tabs)/Profile')
                }}
              >
                <Settings size={28} color={props.tintColor ?? 'white'} />
              </TouchableOpacity>
            )
          },
          headerShown: true,
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='Profile'
        options={{
          headerLeft: (props: HeaderBackButtonProps) => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={30} color={props.tintColor ?? 'white'} />
            </TouchableOpacity>
          ),
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
          title: '',
          tabBarIcon: ({ color }) => <MessageSquare size={28} color={color} />,
          headerShown: true,
        }}
      />
    </Tabs>
  )
}
