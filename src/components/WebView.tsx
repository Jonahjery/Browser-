import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useBrowserStore } from '../stores/browserStore';
import { NewTabPage } from './NewTabPage';
import { useTheme } from '../hooks/useTheme';

export const WebView: React.FC = () => {
  const { tabs, activeTabId, isPrivateMode } = useBrowserStore();
  const { colors } = useTheme();
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  if (!activeTab) return null;

  if (activeTab.url === 'atom://newtab') {
    return <NewTabPage />;
  }

  return (
    <ScrollView 
      style={[
        styles.container, 
        { backgroundColor: isPrivateMode ? colors.privateBackground : colors.background }
      ]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.centerContent}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: isPrivateMode ? colors.privatePrimary : colors.primary }
        ]}>
          <View style={[
            styles.innerIcon,
            { backgroundColor: isPrivateMode ? colors.privateAccent : colors.accent }
          ]} />
        </View>
        
        <Text style={[styles.title, { color: colors.text }]}>
          {activeTab.isLoading ? 'Loading...' : activeTab.title}
        </Text>
        
        <View style={[
          styles.urlContainer,
          { backgroundColor: isPrivateMode ? colors.privateInput : colors.surface }
        ]}>
          <Text style={[styles.url, { color: colors.textSecondary }]}>
            {activeTab.url}
          </Text>
        </View>
        
        {activeTab.isLoading && (
          <ActivityIndicator 
            size="large" 
            color={isPrivateMode ? colors.privatePrimary : colors.primary}
            style={styles.loader}
          />
        )}
        
        {!activeTab.isLoading && (
          <View style={styles.description}>
            <View style={[
              styles.descriptionBox,
              { 
                backgroundColor: isPrivateMode ? colors.privateInput : colors.surface,
                borderColor: isPrivateMode ? colors.privateBorder : colors.border
              }
            ]}>
              <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
                This is a demo browser. In a real implementation, this would display the actual webpage content.
              </Text>
              {isPrivateMode && (
                <View style={[
                  styles.privateNotice,
                  { 
                    backgroundColor: colors.privateBackground,
                    borderColor: colors.privateBorder
                  }
                ]}>
                  <Text style={[styles.privateNoticeText, { color: colors.privateAccent }]}>
                    🔒 Private browsing: Your activity on this site won't be saved to your browsing history.
                  </Text>
                </View>
              )}
            </View>
            
            {/* Simulated webpage preview */}
            <View style={[
              styles.simulatedContent,
              { 
                backgroundColor: isPrivateMode ? colors.privateInput : colors.surface,
                borderColor: isPrivateMode ? colors.privateBorder : colors.border
              }
            ]}>
              <Text style={[styles.simulatedTitle, { color: colors.text }]}>
                Simulated webpage content:
              </Text>
              <View style={styles.simulatedLines}>
                {[1, 0.75, 0.5, 0.85, 0.65, 0.8, 0.35, 0.6].map((width, index) => (
                  <View
                    key={index}
                    style={[
                      styles.simulatedLine,
                      { 
                        width: `${width * 100}%`,
                        backgroundColor: isPrivateMode ? colors.privateBorder : colors.border
                      }
                    ]}
                  />
                ))}
              </View>
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
  innerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  urlContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
    maxWidth: '100%',
  },
  url: {
    fontSize: 14,
    fontFamily: 'monospace',
    textAlign: 'center',
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
    borderWidth: 1,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  privateNotice: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  privateNoticeText: {
    fontSize: 12,
    textAlign: 'center',
  },
  simulatedContent: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  simulatedTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  simulatedLines: {
    gap: 8,
  },
  simulatedLine: {
    height: 12,
    borderRadius: 6,
  },
});