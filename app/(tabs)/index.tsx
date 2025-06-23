import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BrowserHeader } from '../../components/BrowserHeader';
import { AddressBar } from '../../components/AddressBar';
import { WebContent } from '../../components/WebContent';
import { useBrowserStore } from '../../hooks/useBrowserStore';

export default function BrowserTab() {
  const { currentUrl, isLoading, isPrivateMode } = useBrowserStore();

  return (
    <SafeAreaView style={[styles.container, isPrivateMode && styles.privateContainer]}>
      <StatusBar style={isPrivateMode ? 'light' : 'dark'} />
      
      {/* Private Mode Indicator */}
      {isPrivateMode && <View style={styles.privateIndicator} />}
      
      {/* Browser Header */}
      <BrowserHeader />
      
      {/* Address Bar */}
      <AddressBar />
      
      {/* Web Content */}
      <View style={styles.contentContainer}>
        <WebContent />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  privateContainer: {
    backgroundColor: '#1f2937',
  },
  privateIndicator: {
    height: 3,
    backgroundColor: '#8b5cf6',
    opacity: 0.8,
  },
  contentContainer: {
    flex: 1,
  },
});