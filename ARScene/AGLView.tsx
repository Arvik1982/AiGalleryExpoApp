import { ExpoWebGLRenderingContext, GLView } from 'expo-gl'
import { Renderer } from 'expo-three'
import React, { useRef } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import * as THREE from 'three'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export default function ARGLView() {
  const animationId = useRef<number>()

  // 🔥 ОСНОВНАЯ ФУНКЦИЯ — вызывается 1 раз при создании GL контекста
  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    // 1. РЕНДЕРЕР (Three.js → телефон)
    const renderer = new Renderer({ gl })
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight)
    renderer.setClearColor(0x000000, 1) // Черный фон

    // 2. СЦЕНА (контейнер объектов)
    const scene = new THREE.Scene()

    // 3. КАМЕРА (AR камера — смотрит на стол)
    const camera = new THREE.PerspectiveCamera(
      75, // угол обзора
      gl.drawingBufferWidth / gl.drawingBufferHeight, // соотношение
      0.1, // ближняя плоскость отсечения
      1000 // дальняя
    )
    camera.position.set(0, 0, 5) // 5м от объектов

    // 4. ОСВЕЩЕНИЕ (без света = черно)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6) // мягкий свет
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5) // солнце сверху
    scene.add(directionalLight)

    // 5. PROCEDURAL КУБ (твой первый AR объект)
    const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b6b, // коралловый
      metalness: 0.8, // блеск
      roughness: 0.2, // гладкость
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.set(0, 0, -3) // НА СТОЛЕ ПЕРЕД ТОБОЙ
    scene.add(cube)

    // 6. СФЕРА (бонус)
    const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32)
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x4ecdc4,
      transparent: true,
      opacity: 0.9,
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(2, 0.5, -3)
    scene.add(sphere)

    // 7. ИГРОВОЙ ЦИКЛ (60 FPS)
    const tick = () => {
      animationId.current = requestAnimationFrame(tick)

      // АНИМАЦИЯ
      cube.rotation.x += 0.01
      cube.rotation.y += 0.015
      sphere.rotation.y += 0.02
      sphere.position.y = Math.sin(Date.now() * 0.001) * 0.3

      // ОТРИСОВКА
      renderer.render(scene, camera)
      gl.endFrameEXP() // Покажи кадр на экране
    }

    tick() // Запуск

    // 🧹 ОЧИСТКА при выходе
    gl.drawingBufferHeight
    return () => {
      cancelAnimationFrame(animationId.current)
    }
  }

  return (
    <View style={styles.container}>
      <GLView style={styles.glView} onContextCreate={onContextCreate} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glView: {
    flex: 1,
  },
})
