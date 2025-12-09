import { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function Filter() {
  const [filter, setFilter] = useState('Все')

  const filters = ['Все', 'Подписки', 'Популярное']

  const renderFilter = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === item && styles.activeFilter]}
      onPress={() => setFilter(item)}
    >
      <Text
        style={[styles.filterText, filter === item && styles.activeFilterText]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  )

  return (
    <FlatList
      contentContainerStyle={{
        paddingVertical: 5,
        paddingHorizontal: 5,
        alignItems: 'center',
        flexGrow: 0,
      }}
      horizontal
      data={filters}
      renderItem={renderFilter}
      style={styles.filterList}
      showsHorizontalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
  filterList: {},
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
    width: 150,
  },
  activeFilter: { backgroundColor: '#007AFF' },
  filterText: { color: '#666', fontWeight: '500' },
  activeFilterText: { color: 'white' },
  listContainer: { paddingBottom: 20 },

  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
})
