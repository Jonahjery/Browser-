import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBrowserStore } from '../stores/browserStore';
import { AddressBar } from '../components/AddressBar';
import { WebView } from '../components/WebView';
import { NavigationControls } from '../components/NavigationControls';
import { useTheme } from '../hooks/useTheme';

export const BrowserScreen: React.FC = () => {
  const { isPrivateMode } = useBrowserStore();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Private Mode Indicator */}
      {isPrivateMode && (
        <View style={styles.privateIndicator} />
      )}

      {/* Address Bar */}
      <AddressBar />

      {/* Web Content */}
      <View style={styles.webContent}>
        <WebView />
      </View>
      
      {/* Navigation Controls */}
      <NavigationControls />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  privateIndicator: {
    height: 3,
    backgroundColor: '#8B5CF6',
    opacity: 0.8,
  },
  webContent: {
    flex: 1,
  },
});