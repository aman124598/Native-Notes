import { useAppTheme } from '@/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ViewNote() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { isDarkMode } = useAppTheme();
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const themeColors = {
    background: isDarkMode ? '#151718' : '#f8f9fa',
    text: isDarkMode ? '#ffffff' : '#151718',
    snippetText: isDarkMode ? '#dddddd' : '#495057',
    iconBtnBg: '#4E33FF',
    icon: '#ffffff',
  };

  const dynamicStyles = StyleSheet.create({
    containerBg: { backgroundColor: themeColors.background },
    titleText: { color: themeColors.text },
    bodyText: { color: themeColors.snippetText },
    responsivePadding: { paddingHorizontal: isTablet ? '15%' : 20 },
    iconBtn: { backgroundColor: themeColors.iconBtnBg },
  });

  const containerStyle = StyleSheet.compose(styles.container, dynamicStyles.containerBg);
  const contentPadding = StyleSheet.compose(styles.contentContainer, dynamicStyles.responsivePadding);

  return (
    <SafeAreaView style={containerStyle} edges={['bottom']}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop' }}
        style={styles.headerBackground}
        imageStyle={styles.headerBackgroundImage}
      >
        <SafeAreaView edges={['top']} style={styles.safeHeaderView}>
          <View style={[styles.headerOverlay, dynamicStyles.responsivePadding]}>
            <Pressable style={[styles.iconBtn, dynamicStyles.iconBtn]} onPress={() => router.back()}>
              <Feather name="chevron-left" size={24} color={themeColors.icon} />
            </Pressable>

            <Text style={styles.headerText}>Read Note</Text>

            <Pressable
              style={[styles.iconBtn, dynamicStyles.iconBtn]}
              onPress={() => router.push({ pathname: '/create_notes', params })}
            >
              <Feather name="edit-2" size={20} color={themeColors.icon} />
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <ScrollView style={contentPadding} contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, dynamicStyles.titleText]}>{params.title}</Text>
        {params.date && <Text style={styles.date}>{params.date}</Text>}
        <Text style={[styles.snippet, dynamicStyles.bodyText]}>{params.snippet}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBackground: { justifyContent: 'flex-end', backgroundColor: '#333' },
  headerBackgroundImage: { opacity: 0.8 },
  safeHeaderView: { backgroundColor: 'rgba(0,0,0,0.3)' },
  headerOverlay: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  headerText: { color: '#fff', fontSize: 18, fontWeight: '700', letterSpacing: 0.5 },
  iconBtn: { padding: 10, borderRadius: 20, elevation: 2 },
  contentContainer: { flex: 1 },
  scrollContent: { paddingBottom: 40, paddingTop: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, lineHeight: 40 },
  date: { fontSize: 14, color: '#888', marginBottom: 25 },
  snippet: { fontSize: 18, lineHeight: 28 },
});