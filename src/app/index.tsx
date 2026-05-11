import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/context/ThemeContext';

const INITIAL_DUMMY_NOTES = [
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
  }
];

export default function index() {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState<{ id: string; title: string; snippet: string; date: string }[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadNotes = async () => {
        try {
          const savedNotes = await AsyncStorage.getItem('saved_notes');
          if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
          } else {
            setNotes(INITIAL_DUMMY_NOTES);
            await AsyncStorage.setItem('saved_notes', JSON.stringify(INITIAL_DUMMY_NOTES));
          }
        } catch (error) {
          console.error("Failed to load notes", error);
        }
      };

      loadNotes();
    }, [])
  );

  const theme = {
    background: isDarkMode ? '#151718' : '#f8f9fa',
    text: isDarkMode ? '#ffffff' : '#151718',
    inputBorder: isDarkMode ? '#333' : '#dee2e6',
    placeholder: isDarkMode ? '#aaa' : '#6c757d',
    icon: '#ffffff',
    cardBackground: isDarkMode ? '#1e1e1e' : '#ffffff',
    cardBorder: isDarkMode ? 'transparent' : '#e9ecef',
    snippetText: isDarkMode ? '#ccc' : '#6c757d',
    dateText: isDarkMode ? '#888' : '#adb5bd',
    accentBlue: '#4E33FF',
    accentYellow: '#FFD633',
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['bottom']}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop' }}
        style={styles.headerBackground}
        imageStyle={styles.headerBackgroundImage}
      >
        <SafeAreaView edges={['top']} style={styles.safeHeaderView}>
          <View style={styles.headerOverlay}>
            <Text style={styles.h_text}>Notes</Text>

            <Pressable
              onPress={toggleTheme}
              style={[styles.themeToggle, { backgroundColor: theme.accentBlue }]}
            >
              <Feather name={isDarkMode ? 'sun' : 'moon'} size={20} color={theme.icon} />
            </Pressable>

            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder='Search Notes...'
              placeholderTextColor='#aaa'
              style={styles.searchInput}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({ pathname: '/view_note', params: { id: item.id, title: item.title, snippet: item.snippet, date: item.date } })}
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

      <Pressable
        style={styles.fab}
        onPress={() => router.push('/create_notes')}
      >
        <Feather name="plus" size={30} color="#ffffff" />
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    backgroundColor: '#333',
  },
  headerBackgroundImage: {
    opacity: 0.8,
  },
  safeHeaderView: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  headerOverlay: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  h_text: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
    color: '#fff',
    letterSpacing: 1,
  },
  themeToggle: {
    position: 'absolute',
    top: 15,
    right: 20,
    padding: 10,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 12,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
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
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#9b90e0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
})