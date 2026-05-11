import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { ThemeProvider, useAppTheme } from '@/context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}

function LayoutContent() {
  const { isDarkMode } = useAppTheme();
  return (
    <NavigationThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="create_notes" />
        <Stack.Screen name="view_note" />
      </Stack>
    </NavigationThemeProvider>
  );
}