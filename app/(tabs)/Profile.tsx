import { ThemedView } from '@/components/themed-view'
import { addTraining, saveUserData } from '@/firebase/api'
import { useAuth } from '@/firebase/useAuth'
import { useState } from 'react'
import { Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

export default function ProfileScreen() {
  const { user } = useAuth()
  const [val, setVal] = useState('')
  return (
    <ThemedView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: 'green',
      }}
    >
      <TextInput
        style={{ width: '100%', height: 50, backgroundColor: 'white' }}
        value={val}
        onChangeText={setVal}
      />
      <TouchableOpacity style={{ width: '100%' }}>
        <Button
          onPress={() => user && saveUserData(user.uid, { val })}
          title='SEND'
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ width: '100%' }}>
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
        ></Button>
      </TouchableOpacity>
    </ThemedView>
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
    //   headerImage={
    //     <IconSymbol
    //       size={310}
    //       color='#808080'
    //       name='chevron.left.forwardslash.chevron.right'
    //       style={styles.headerImage}
    //     />
    //   }
    // >
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText
    //       type='title'
    //       style={{
    //         fontFamily: Fonts.rounded,
    //       }}
    //     >
    //       Explore
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedText>
    //     This app includes example code to help you get started.
    //   </ThemedText>
    //   <Collapsible title='File-based routing'>
    //     <ThemedText>
    //       This app has two screens:{' '}
    //       <ThemedText type='defaultSemiBold'>app/(tabs)/index.tsx</ThemedText>{' '}
    //       and{' '}
    //       <ThemedText type='defaultSemiBold'>app/(tabs)/explore.tsx</ThemedText>
    //     </ThemedText>
    //     <ThemedText>
    //       The layout file in{' '}
    //       <ThemedText type='defaultSemiBold'>app/(tabs)/_layout.tsx</ThemedText>{' '}
    //       sets up the tab navigator.
    //     </ThemedText>
    //     <ExternalLink href='https://docs.expo.dev/router/introduction'>
    //       <ThemedText type='link'>Learn more</ThemedText>
    //     </ExternalLink>
    //   </Collapsible>
    //   <Collapsible title='Android, iOS, and web support'>
    //     <ThemedText>
    //       You can open this project on Android, iOS, and the web. To open the
    //       web version, press <ThemedText type='defaultSemiBold'>w</ThemedText>{' '}
    //       in the terminal running this project.
    //     </ThemedText>
    //   </Collapsible>
    //   <Collapsible title='Images'>
    //     <ThemedText>
    //       For static images, you can use the{' '}
    //       <ThemedText type='defaultSemiBold'>@2x</ThemedText> and{' '}
    //       <ThemedText type='defaultSemiBold'>@3x</ThemedText> suffixes to
    //       provide files for different screen densities
    //     </ThemedText>
    //     <Image
    //       source={require('@/assets/images/react-logo.png')}
    //       style={{ width: 100, height: 100, alignSelf: 'center' }}
    //     />
    //     <ExternalLink href='https://reactnative.dev/docs/images'>
    //       <ThemedText type='link'>Learn more</ThemedText>
    //     </ExternalLink>
    //   </Collapsible>
    //   <Collapsible title='Light and dark mode components'>
    //     <ThemedText>
    //       This template has light and dark mode support. The{' '}
    //       <ThemedText type='defaultSemiBold'>useColorScheme()</ThemedText> hook
    //       lets you inspect what the user&apos;s current color scheme is, and so
    //       you can adjust UI colors accordingly.
    //     </ThemedText>
    //     <ExternalLink href='https://docs.expo.dev/develop/user-interface/color-themes/'>
    //       <ThemedText type='link'>Learn more</ThemedText>
    //     </ExternalLink>
    //   </Collapsible>
    //   <Collapsible title='Animations'>
    //     <ThemedText>
    //       This template includes an example of an animated component. The{' '}
    //       <ThemedText type='defaultSemiBold'>
    //         components/HelloWave.tsx
    //       </ThemedText>{' '}
    //       component uses the powerful{' '}
    //       <ThemedText type='defaultSemiBold' style={{ fontFamily: Fonts.mono }}>
    //         react-native-reanimated
    //       </ThemedText>{' '}
    //       library to create a waving hand animation.
    //     </ThemedText>
    //     {Platform.select({
    //       ios: (
    //         <ThemedText>
    //           The{' '}
    //           <ThemedText type='defaultSemiBold'>
    //             components/ParallaxScrollView.tsx
    //           </ThemedText>{' '}
    //           component provides a parallax effect for the header image.
    //         </ThemedText>
    //       ),
    //     })}
    //   </Collapsible>
    // </ParallaxScrollView>
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
