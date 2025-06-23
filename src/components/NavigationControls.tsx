import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrowserStore } from '../stores/browserStore';
import { useTheme } from '../hooks/useTheme';
import { TabSwitcher } from './TabSwitcher';
import { BrowserMenu } from './BrowserMenu';

export const NavigationControls: React.FC = () => {
  const { activeTabId, navigateTab, goBack, goForward, canGoBack, canGoForward } = useBrowserStore();
  const { colors } = useTheme();

  const handleHome = () => {
    if (activeTabId) {
      navigateTab(activeTabId, 'atom://newtab');
    }
  };

  const handleRefresh = () => {
    if (activeTabId) {
      const activeTab = useBrowserStore.getState().tabs.find(tab => tab.id === activeTabId);
      if (activeTab && activeTab.url !== 'atom://newtab') {
        navigateTab(activeTabId, activeTab.url);
      }
    }
  };

  const handleBack = () => {
    if (activeTabId && canGoBack(activeTabId)) {
      goBack(activeTabId);
    }
  };

  const handleForward = () => {
    if (activeTabId && canGoForward(activeTabId)) {
      goForward(activeTabId);
    }
  };

  const canNavigateBack = activeTabId ? canGoBack(activeTabId) : false;
  const canNavigateForward = activeTabId ? canGoForward(activeTabId) : false;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
      {/* Left side navigation */}
      <View style={styles.leftControls}>
        <TouchableOpacity
          onPress={handleBack}
          disabled={!canNavigateBack}
          style={[styles.navButton, { opacity: canNavigateBack ? 1 : 0.4 }]}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={canNavigateBack ? colors.text : colors.textSecondary} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleForward}
          disabled={!canNavigateForward}
          style={[styles.navButton, { opacity: canNavigateForward ? 1 : 0.4 }]}
        >
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color={canNavigateForward ? colors.text : colors.textSecondary} 
          />
        </TouchableOpacity>
      </View>

      {/* Center controls */}
      <View style={styles.centerControls}>
        <TouchableOpacity onPress={handleRefresh} style={styles.navButton}>
          <Ionicons name="refresh" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleHome} style={styles.navButton}>
          <Ionicons name="home" size={24} color={colors.text} />
        </TouchableOpacity>

        <TabSwitcher />
      </View>

      {/* Right side menu */}
      <View style={styles.rightControls}>
        <BrowserMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  leftControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});