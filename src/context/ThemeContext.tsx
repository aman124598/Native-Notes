import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('app_theme').then((theme) => {
      if (theme !== null) {
        setIsDarkMode(theme === 'dark');
      }
      setIsLoaded(true);
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    AsyncStorage.setItem('app_theme', newTheme ? 'dark' : 'light');
  };

  if (!isLoaded) return null;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
