import { GLView } from 'expo-gl'
import * as THREE from 'expo-three'
import { Renderer } from 'expo-three'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function ARScene() {
  const onContextCreate = async (gl) => {
    // 1. РЕНДЕРЕР
    const renderer = new Renderer({ gl })
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight)
    renderer.setClearColor('#000000')

    // 2. СЦЕНА
    const scene = new THREE.Scene()

    // 3. КАМЕРА (AR камера синхронизируется с телефоном)
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // 4. СВЕТ
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 0.5)
    scene.add(directionalLight)

    // 5. PROCEDURAL КУБ (0.1сек)
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({
      color: 0xff6b6b,
      metalness: 0.7,
      roughness: 0.3,
    })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0, 0, -2) // На столе перед камерой
    scene.add(cube)

    // 6. АНИМАЦИЯ
    const animate = () => {
      requestAnimationFrame(animate)

      // Вращение куба
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      // РЕНДЕР
      renderer.render(scene, camera)
      gl.endFrameEXP()
    }
    animate()
  }

  return (
    <View style={styles.container}>
      <GLView style={styles.glView} onContextCreate={onContextCreate} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glView: { flex: 1 },
})
