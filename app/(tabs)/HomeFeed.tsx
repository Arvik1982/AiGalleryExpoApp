import { mockPublications } from '@/mock/feed'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

interface Publication {
  id: string
  author: string
  avatar: string
  description: string
  likes: number
  comments: number
  time: string
  arPreview: string
}

const HomeFeed = () => {
  const [publications] = useState(mockPublications)

  const renderPublication = ({ item }: { item: Publication }) => (
    <View style={styles.publicationCard}>
      <View style={styles.authorRow}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        <Text style={styles.authorName}>{item.author}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.arPreview}>
        <Text style={styles.arEmoji}>{item.arPreview}</Text>
        <Text style={styles.arLabel}>Нажми для AR-просмотра</Text>
      </View>

      <View style={styles.actionsRow}>
        <Text style={styles.actionText}>❤️ {item.likes}</Text>
        <Text style={styles.actionText}>💬 {item.comments}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Лента публикаций */}
      <FlatList
        data={publications}
        renderItem={renderPublication}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },

  listContainer: { paddingBottom: 20 },
  publicationCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: { fontSize: 24, marginRight: 12 },
  authorName: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  time: { color: '#999', fontSize: 12 },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
    color: '#333',
  },
  arPreview: {
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  arEmoji: { fontSize: 48, marginBottom: 8 },
  arLabel: { color: '#007AFF', fontWeight: '600' },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionText: { fontSize: 14, fontWeight: '600', color: '#666' },
})

export default HomeFeed
