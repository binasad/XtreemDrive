import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors, spacing, radius, typography } from './colors';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState(systemScheme === 'light' ? 'light' : 'dark');

  const value = useMemo(() => {
    const colors = mode === 'light' ? lightColors : darkColors;
    return {
      mode,
      colors,
      spacing,
      radius,
      typography,
      toggle: () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
      setMode,
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
