# 🚀 AiGalleryExpoApp — AR Галерея с Firebase

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-51+-46BC2F?style=flat&logo=expo&logoColor=white)](https://expo.dev)
[![ReactNative](https://img.shields.io/badge/React_Native-0.75-20232A?style=flat&logo=react&logoColor=%2361DAFB)](https://reactnative.dev)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=orange)](https://firebase.google.com)
[![Status](https://img.shields.io/badge/Status-WIP-orange?style=flat&logo=roadmap&logoColor=white)](https://roadmap.sh)

## 🎮 Текущий статус: **Firebase Backend + Камера готово**
- ✅ Firebase — Auth + Firestore + Storage (готово!)
- ✅ expo-camera — камера работает (development build)
- ✅ react-native-paper — UI компоненты
- ✅ TypeScript — полная типизация
- ✅ Архитектура: hooks/services/screens (senior-level)
- ❌ ARGLView + expo-three — 3D сцена (в работе)
- ❌ FeedScreen — лента постов (в работе)
- ❌ CreateScreen — создание AR объектов (в работе)

## 🛤️ Roadmap (декабрь 2025)
- 1️⃣ [ ] ARGLView — expo-gl + expo-three (GLView + Three.js)
- 2️⃣ [ ] CreateScreen — scene.add(cube/sphere) по тапу
- 3️⃣ [ ] FeedScreen — лента постов из Firestore
- 4️⃣ [ ] react-navigation — bottom tabs (Feed/Create/Profile)
- 5️⃣ [ ] TripoAI — AI .glb модели в Storage
- 6️⃣ [ ] Запись AR видео → пост

## 🚀 **Быстрый запуск (5 минут)**

### **1. Клонируй + установи**
- git clone https://github.com/Arvik1982/AiGalleryExpoApp.git
- cd AiGalleryExpoApp
- pnpm install
### **2. Firebase config**
cp .env.example .env
Добавь свои Firebase ключи из console.firebase.google.com

