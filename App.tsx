import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useBrowserStore } from './src/stores/browserStore';
import { WelcomeSlides } from './src/components/WelcomeSlides';
import { BrowserScreen } from './src/screens/BrowserScreen';

export default function App() {
  const { hasCompletedWelcome, setWelcomeCompleted, theme } = useBrowserStore();

  // Show welcome slides for first-time users
  if (!hasCompletedWelcome) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
          <WelcomeSlides onComplete={setWelcomeCompleted} />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <BrowserScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});