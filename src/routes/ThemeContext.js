// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('dark');
  if (mode === 'dark') {
    document.documentElement.style.setProperty(
      '--background-color',
      'var(--background-color-dark)'
    );
    document.documentElement.style.setProperty(
      '--text-color',
      'var(--text-color-dark)'
    );
  } else {
    document.documentElement.style.setProperty(
      '--background-color',
      'var(--background-color-light)'
    );
    document.documentElement.style.setProperty(
      '--text-color',
      'var(--text-color-light)'
    );
  }

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode); // 상태 업데이트
    localStorage.setItem('mode', newMode); // localStorage에 저장

    // 스타일 업데이트
    if (newMode === 'dark') {
      document.documentElement.style.setProperty(
        '--background-color',
        'var(--background-color-dark)'
      );
      document.documentElement.style.setProperty(
        '--text-color',
        'var(--text-color-dark)'
      );
    } else {
      document.documentElement.style.setProperty(
        '--background-color',
        'var(--background-color-light)'
      );
      document.documentElement.style.setProperty(
        '--text-color',
        'var(--text-color-light)'
      );
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeProvider;
