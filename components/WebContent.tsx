import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Globe, Shield } from 'lucide-react-native';
import { useBrowserStore } from '../hooks/useBrowserStore';
import { NewTabPage } from './NewTabPage';

export const WebContent: React.FC = () => {
  const { currentUrl, isLoading, isPrivateMode, currentTitle } = useBrowserStore();

  if (currentUrl === 'atom://newtab' || !currentUrl) {
    return <NewTabPage />;
  }

  return (
    <ScrollView 
      style={[styles.container, isPrivateMode && styles.privateContainer]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.centerContent}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: isPrivateMode ? '#8b5cf6' : '#3b82f6' }
        ]}>
          {isPrivateMode ? (
            <Shield size={32} color="#ffffff" />
          ) : (
            <Globe size={32} color="#ffffff" />
          )}
        </View>
        
        <Text style={[styles.title, isPrivateMode && styles.privateTitle]}>
          {isLoading ? 'Loading...' : currentTitle || 'Website'}
        </Text>
        
        <View style={[
          styles.urlContainer,
          isPrivateMode && styles.privateUrlContainer
        ]}>
          <Text style={[styles.url, isPrivateMode && styles.privateUrl]}>
            {currentUrl}
          </Text>
        </View>
        
        {isLoading && (
          <ActivityIndicator 
            size="large" 
            color={isPrivateMode ? '#8b5cf6' : '#3b82f6'}
            style={styles.loader}
          />
        )}
        
        {!isLoading && (
          <View style={styles.description}>
            <View style={[
              styles.descriptionBox,
              isPrivateMode && styles.privateDescriptionBox
            ]}>
              <Text style={[styles.descriptionText, isPrivateMode && styles.privateDescriptionText]}>
                This is a demo browser. In a real implementation, this would display the actual webpage content.
              </Text>
              {isPrivateMode && (
                <View style={styles.privateNotice}>
                  <Text style={styles.privateNoticeText}>
                    🔒 Private browsing: Your activity on this site won't be saved to your browsing history.
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  privateContainer: {
    backgroundColor: '#1f2937',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  centerContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#111827',
  },
  privateTitle: {
    color: '#ffffff',
  },
  urlContainer: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
    maxWidth: '100%',
  },
  privateUrlContainer: {
    backgroundColor: '#374151',
  },
  url: {
    fontSize: 14,
    fontFamily: 'monospace',
    textAlign: 'center',
    color: '#6b7280',
  },
  privateUrl: {
    color: '#9ca3af',
  },
  loader: {
    marginBottom: 24,
  },
  description: {
    width: '100%',
    maxWidth: 400,
  },
  descriptionBox: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  privateDescriptionBox: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '#6b7280',
  },
  privateDescriptionText: {
    color: '#9ca3af',
  },
  privateNotice: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#4b5563',
  },
  privateNoticeText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#c084fc',
  },
});