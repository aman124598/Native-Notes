import Feather from '@expo/vector-icons/Feather';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DUMMY_NOTES = [
  {
    id: '1',
    title: 'React Native Basics',
    snippet: 'Learn about View, Text, StyleSheet, and Flexbox layouts.',
    date: 'May 11, 2026',
  },
  {
    id: '2',
    title: 'Grocery List',
    snippet: 'Milk, Eggs, Bread, Bananas, and Coffee beans.',
    date: 'May 10, 2026',
  },
  {
    id: '3',
    title: 'Meeting Notes',
    snippet: 'Discussed Q3 goals. Need to follow up with the design team.',
    date: 'May 09, 2026',
  },
  {
    id: '4',
    title: 'Weekend Plans',
    snippet: 'Hiking at the state park, try out the new Italian restaurant.',
    date: 'May 08, 2026',
  }
];

const index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Dynamic theme colors
  const theme = {
    background: isDarkMode ? '#101011' : '#f8f9fa',
    text: isDarkMode ? '#fff' : '#212529',
    inputBorder: isDarkMode ? '#fff' : '#dee2e6',
    placeholder: isDarkMode ? '#aaa' : '#6c757d',
    icon: isDarkMode ? 'white' : 'black',
    cardBackground: isDarkMode ? '#1e1e1e' : '#ffffff',
    cardBorder: isDarkMode ? 'transparent' : '#e9ecef',
    snippetText: isDarkMode ? '#ccc' : '#6c757d',
    dateText: isDarkMode ? '#888' : '#adb5bd',
  };

  const filteredNotes = DUMMY_NOTES.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.h_view}>
        <Text style={[styles.h_text, { color: theme.text }]}>Notes</Text>

        <Pressable
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={styles.themeToggle}
        >
          <Feather name={isDarkMode ? 'sun' : 'moon'} size={24} color={theme.icon} />
        </Pressable>

        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Search Notes'
          placeholderTextColor={theme.placeholder}
          style={[styles.searchInput, { borderColor: theme.inputBorder, color: theme.text }]} />
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}
            android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={2}>{item.title}</Text>
              <Text style={[styles.cardDate, { color: theme.dateText }]}>{item.date}</Text>
            </View>
            <Text style={[styles.cardSnippet, { color: theme.snippetText }]} numberOfLines={4}>{item.snippet}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101011'
  },
  h_view: {

  },
  h_text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20
  },
  themeToggle: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
  },
  cardSnippet: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  }
})