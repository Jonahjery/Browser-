import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrowserStore } from '../stores/browserStore';
import { useTheme } from '../hooks/useTheme';

export const BrowserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    bookmarks, 
    history, 
    isPrivateMode, 
    theme, 
    togglePrivateMode, 
    setTheme, 
    navigateTab, 
    activeTabId,
    clearHistory,
    createTab
  } = useBrowserStore();
  const { colors } = useTheme();

  const handleBookmarkClick = (url: string) => {
    if (activeTabId) {
      navigateTab(activeTabId, url);
      setIsOpen(false);
    }
  };

  const handleHistoryClick = (url: string) => {
    if (activeTabId) {
      navigateTab(activeTabId, url);
      setIsOpen(false);
    }
  };

  const handleNewTab = () => {
    createTab('atom://newtab', isPrivateMode);
    setIsOpen(false);
  };

  const handleNewIncognitoTab = () => {
    createTab('atom://newtab', !isPrivateMode);
    setIsOpen(false);
  };

  const menuItems = [
    {
      icon: 'add',
      title: 'New tab',
      onPress: handleNewTab,
    },
    {
      icon: 'shield',
      title: isPrivateMode ? 'New normal tab' : 'New private tab',
      onPress: handleNewIncognitoTab,
    },
    {
      icon: 'time',
      title: 'History',
      onPress: () => {},
    },
    {
      icon: 'bookmark',
      title: 'Bookmarks',
      onPress: () => {},
    },
    {
      icon: 'download',
      title: 'Downloads',
      onPress: () => {},
    },
    {
      icon: 'share',
      title: 'Share',
      onPress: () => {},
    },
    {
      icon: 'search',
      title: 'Find in page',
      onPress: () => {},
    },
    {
      icon: 'settings',
      title: 'Settings',
      onPress: () => {},
    },
  ];

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={24} color={colors.text} />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Menu
            </Text>
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={styles.closeButton}
            >
              <Text style={[styles.closeButtonText, { color: colors.primary }]}>Done</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.menuList} contentContainerStyle={styles.menuContent}>
            {/* Quick Actions Grid */}
            <View style={styles.quickActions}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={item.onPress}
                  style={[styles.quickActionItem, { backgroundColor: colors.surface }]}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: colors.input }]}>
                    <Ionicons name={item.icon as any} size={20} color={colors.text} />
                  </View>
                  <Text style={[styles.quickActionText, { color: colors.text }]} numberOfLines={2}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Theme Toggle */}
              <TouchableOpacity
                onPress={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                  setIsOpen(false);
                }}
                style={[styles.quickActionItem, { backgroundColor: colors.surface }]}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: colors.input }]}>
                  <Ionicons 
                    name={theme === 'dark' ? 'sunny' : 'moon'} 
                    size={20} 
                    color={colors.text} 
                  />
                </View>
                <Text style={[styles.quickActionText, { color: colors.text }]} numberOfLines={2}>
                  {theme === 'dark' ? 'Light theme' : 'Dark theme'}
                </Text>
              </TouchableOpacity>

              {/* Privacy Mode Toggle */}
              <TouchableOpacity
                onPress={() => {
                  togglePrivateMode();
                  setIsOpen(false);
                }}
                style={[
                  styles.quickActionItem, 
                  { backgroundColor: isPrivateMode ? '#8B5CF6' + '20' : colors.surface }
                ]}
              >
                <View style={[
                  styles.quickActionIcon, 
                  { backgroundColor: isPrivateMode ? '#8B5CF6' : colors.input }
                ]}>
                  <Ionicons 
                    name="shield" 
                    size={20} 
                    color={isPrivateMode ? '#FFFFFF' : colors.text} 
                  />
                </View>
                <Text style={[styles.quickActionText, { color: colors.text }]} numberOfLines={2}>
                  {isPrivateMode ? 'Exit private' : 'Privacy mode'}
                </Text>
                {isPrivateMode && (
                  <View style={styles.activeIndicator} />
                )}
              </TouchableOpacity>
            </View>

            {/* Recent Bookmarks */}
            {bookmarks.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Bookmarks</Text>
                {bookmarks.slice(0, 5).map((bookmark) => (
                  <TouchableOpacity
                    key={bookmark.id}
                    onPress={() => handleBookmarkClick(bookmark.url)}
                    style={[styles.listItem, { backgroundColor: colors.surface }]}
                  >
                    <View style={[styles.listItemIcon, { backgroundColor: colors.input }]}>
                      <Ionicons name="bookmark" size={16} color={colors.primary} />
                    </View>
                    <View style={styles.listItemContent}>
                      <Text style={[styles.listItemTitle, { color: colors.text }]} numberOfLines={1}>
                        {bookmark.title}
                      </Text>
                      <Text style={[styles.listItemSubtitle, { color: colors.textSecondary }]} numberOfLines={1}>
                        {bookmark.url}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Recent History */}
            {history.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent History</Text>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'Clear History',
                        'Are you sure you want to clear your browsing history?',
                        [
                          { text: 'Cancel', style: 'cancel' },
                          { 
                            text: 'Clear', 
                            style: 'destructive',
                            onPress: () => {
                              clearHistory();
                              setIsOpen(false);
                            }
                          }
                        ]
                      );
                    }}
                    style={styles.clearButton}
                  >
                    <Text style={[styles.clearButtonText, { color: colors.warning }]}>Clear</Text>
                  </TouchableOpacity>
                </View>
                {history.slice(0, 5).map((entry) => (
                  <TouchableOpacity
                    key={entry.id}
                    onPress={() => handleHistoryClick(entry.url)}
                    style={[styles.listItem, { backgroundColor: colors.surface }]}
                  >
                    <View style={[styles.listItemIcon, { backgroundColor: colors.input }]}>
                      <Ionicons name="time" size={16} color={colors.textSecondary} />
                    </View>
                    <View style={styles.listItemContent}>
                      <Text style={[styles.listItemTitle, { color: colors.text }]} numberOfLines={1}>
                        {entry.title}
                      </Text>
                      <Text style={[styles.listItemSubtitle, { color: colors.textSecondary }]} numberOfLines={1}>
                        {entry.url}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuList: {
    flex: 1,
  },
  menuContent: {
    padding: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  quickActionItem: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  quickActionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 12,
  },
  activeIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B5CF6',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  listItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  listItemSubtitle: {
    fontSize: 12,
  },
});