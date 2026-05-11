import { useAppTheme } from '@/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateNotes() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState(params.title ? String(params.title) : '');
  const [note, setNote] = useState(params.snippet ? String(params.snippet) : '');

  const { isDarkMode } = useAppTheme();
  const { width } = useWindowDimensions();

  const handleSave = async () => {
    if (!title.trim() && !note.trim()) {
      Alert.alert('Empty Note', 'Please enter a title or note before saving.');
      return;
    }

    try {
      const existingNotesStr = await AsyncStorage.getItem('saved_notes');
      let existingNotes = existingNotesStr ? JSON.parse(existingNotesStr) : [];

      if (params.id) {
        // Update existing note
        existingNotes = existingNotes.map((n: any) =>
          n.id === params.id
            ? { ...n, title: title.trim() || 'Untitled Note', snippet: note.trim() || 'No content', date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) }
            : n
        );
      } else {
        // Create new note safely
        const newNote = {
          id: Date.now().toString(),
          title: title.trim() || 'Untitled Note',
          snippet: note.trim() || 'No content',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        };
        existingNotes = [newNote, ...existingNotes];
      }

      await AsyncStorage.setItem('saved_notes', JSON.stringify(existingNotes));

      router.back();
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save the note.');
    }
  };

  const isTablet = width >= 768;

  const themeColors = {
    background: isDarkMode ? '#151718' : '#f8f9fa',
    text: isDarkMode ? '#ffffff' : '#151718',
    placeholder: isDarkMode ? '#666666' : '#adb5bd',
    inputBorder: isDarkMode ? '#333333' : '#dee2e6',
    accentBlue: '#9b90e0',
    accentYellow: '#FFD633',
  };

  const dynamicStyles = StyleSheet.create({
    containerBg: { backgroundColor: themeColors.background },
    textPrimary: { color: themeColors.text },
    inputBorder: { borderBottomColor: themeColors.inputBorder },
    responsivePadding: { paddingHorizontal: isTablet ? '15%' : 20 },
    iconBtn: { backgroundColor: themeColors.accentBlue },
  });

  const containerStyle = StyleSheet.compose(styles.container, dynamicStyles.containerBg);
  const contentPadding = StyleSheet.compose(styles.contentContainer, dynamicStyles.responsivePadding);
  const titleStyle = StyleSheet.compose(
    StyleSheet.compose(styles.titleInput, dynamicStyles.textPrimary),
    dynamicStyles.inputBorder
  );
  const noteStyle = StyleSheet.compose(styles.noteInput, dynamicStyles.textPrimary);

  return (
    <SafeAreaView style={containerStyle} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop' }}
          style={styles.headerBackground}
          imageStyle={styles.headerBackgroundImage}
        >
          <SafeAreaView edges={['top']} style={styles.safeHeaderView}>
            <View style={[styles.headerOverlay, dynamicStyles.responsivePadding]}>
              <Pressable style={[styles.iconBtn, dynamicStyles.iconBtn]} onPress={() => router.back()}>
                <Feather name="chevron-left" size={24} color="#fff" />
              </Pressable>

              <Text style={styles.headerText}>Edit Note</Text>

              <Pressable style={[styles.iconBtn, dynamicStyles.iconBtn]} onPress={handleSave}>
                <Feather name="check" size={24} color="#fff" />
              </Pressable>
            </View>
          </SafeAreaView>
        </ImageBackground>

        <View style={contentPadding}>
          <TextInput
            style={titleStyle}
            placeholder="Note Title"
            placeholderTextColor={themeColors.placeholder}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={noteStyle}
            placeholder="Start typing your note here..."
            placeholderTextColor={themeColors.placeholder}
            multiline
            textAlignVertical="top"
            value={note}
            onChangeText={setNote}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerBackground: {
    justifyContent: 'flex-end',
    backgroundColor: '#333',
  },
  headerBackgroundImage: {
    opacity: 0.8,
  },
  safeHeaderView: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  iconBtn: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
  },
  titleInput: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  noteInput: {
    fontSize: 17,
    flex: 1,
    lineHeight: 26,
  },
});