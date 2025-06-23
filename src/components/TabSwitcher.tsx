import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrowserStore } from '../stores/browserStore';
import { useTheme } from '../hooks/useTheme';

const { width, height } = Dimensions.get('window');

export const TabSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { tabs, activeTabId, setActiveTab, closeTab, createTab, isPrivateMode } = useBrowserStore();
  const { colors } = useTheme();

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  const handleCloseTab = (tabId: string) => {
    closeTab(tabId);
  };

  const handleNewTab = () => {
    createTab('atom://newtab', isPrivateMode);
    setIsOpen(false);
  };

  const getTabTitle = (tab: any) => {
    if (tab.url === 'atom://newtab') return 'New Tab';
    return tab.title || 'Loading...';
  };

  const getTabUrl = (tab: any) => {
    if (tab.url === 'atom://newtab') return '';
    try {
      const urlObj = new URL(tab.url);
      return urlObj.hostname;
    } catch {
      return tab.url;
    }
  };

  const getFavicon = (tab: any) => {
    if (tab.url === 'atom://newtab') return tab.isPrivate ? 'lock' : 'home';
    if (tab.url.includes('google.com')) return 'search';
    if (tab.url.includes('github.com')) return 'logo-github';
    if (tab.url.includes('youtube.com')) return 'logo-youtube';
    return tab.isPrivate ? 'lock' : 'globe';
  };

  const privateTabs = tabs.filter(tab => tab.isPrivate);
  const normalTabs = tabs.filter(tab => !tab.isPrivate);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={[styles.tabButton, { backgroundColor: colors.input }]}
      >
        <Ionicons name="layers" size={24} color={colors.text} />
        {tabs.length > 1 && (
          <View style={[styles.tabCount, { backgroundColor: colors.primary }]}>
            <Text style={styles.tabCountText}>{tabs.length}</Text>
          </View>
        )}
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
              Open Tabs
            </Text>
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={styles.closeButton}
            >
              <Text style={[styles.closeButtonText, { color: colors.primary }]}>Done</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.tabsList} contentContainerStyle={styles.tabsContent}>
            {/* Private Tabs Section */}
            {privateTabs.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="lock-closed" size={16} color="#8B5CF6" />
                  <Text style={[styles.sectionTitle, { color: '#8B5CF6' }]}>
                    Private Tabs ({privateTabs.length})
                  </Text>
                </View>
                {privateTabs.map((tab) => (
                  <TouchableOpacity
                    key={tab.id}
                    onPress={() => handleTabClick(tab.id)}
                    style={[
                      styles.tabItem,
                      { 
                        backgroundColor: tab.id === activeTabId ? colors.primary + '20' : colors.surface,
                        borderColor: tab.id === activeTabId ? colors.primary : colors.border
                      }
                    ]}
                  >
                    <View style={styles.tabContent}>
                      <View style={[styles.tabIcon, { backgroundColor: '#8B5CF6' }]}>
                        <Ionicons name={getFavicon(tab) as any} size={16} color="#FFFFFF" />
                      </View>
                      <View style={styles.tabInfo}>
                        <Text style={[styles.tabTitle, { color: colors.text }]} numberOfLines={1}>
                          {getTabTitle(tab)}
                        </Text>
                        {getTabUrl(tab) && (
                          <Text style={[styles.tabUrl, { color: colors.textSecondary }]} numberOfLines={1}>
                            {getTabUrl(tab)}
                          </Text>
                        )}
                      </View>
                      {tabs.length > 1 && (
                        <TouchableOpacity
                          onPress={() => handleCloseTab(tab.id)}
                          style={styles.closeTabButton}
                        >
                          <Ionicons name="close" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Normal Tabs Section */}
            {normalTabs.length > 0 && (
              <View style={styles.section}>
                {privateTabs.length > 0 && (
                  <View style={styles.sectionHeader}>
                    <Ionicons name="globe" size={16} color={colors.primary} />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                      Normal Tabs ({normalTabs.length})
                    </Text>
                  </View>
                )}
                {normalTabs.map((tab) => (
                  <TouchableOpacity
                    key={tab.id}
                    onPress={() => handleTabClick(tab.id)}
                    style={[
                      styles.tabItem,
                      { 
                        backgroundColor: tab.id === activeTabId ? colors.primary + '20' : colors.surface,
                        borderColor: tab.id === activeTabId ? colors.primary : colors.border
                      }
                    ]}
                  >
                    <View style={styles.tabContent}>
                      <View style={[styles.tabIcon, { backgroundColor: colors.primary }]}>
                        <Ionicons name={getFavicon(tab) as any} size={16} color="#FFFFFF" />
                      </View>
                      <View style={styles.tabInfo}>
                        <Text style={[styles.tabTitle, { color: colors.text }]} numberOfLines={1}>
                          {getTabTitle(tab)}
                        </Text>
                        {getTabUrl(tab) && (
                          <Text style={[styles.tabUrl, { color: colors.textSecondary }]} numberOfLines={1}>
                            {getTabUrl(tab)}
                          </Text>
                        )}
                      </View>
                      {tabs.length > 1 && (
                        <TouchableOpacity
                          onPress={() => handleCloseTab(tab.id)}
                          style={styles.closeTabButton}
                        >
                          <Ionicons name="close" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Add New Tab */}
            <TouchableOpacity
              onPress={handleNewTab}
              style={[styles.addTabButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Ionicons name="add" size={24} color={colors.primary} />
              <Text style={[styles.addTabText, { color: colors.text }]}>
                New {isPrivateMode ? 'Private ' : ''}Tab
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tabCount: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabCountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
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
  tabsList: {
    flex: 1,
  },
  tabsContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabItem: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    overflow: 'hidden',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  tabIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tabInfo: {
    flex: 1,
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  tabUrl: {
    fontSize: 12,
  },
  closeTabButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    gap: 8,
  },
  addTabText: {
    fontSize: 16,
    fontWeight: '600',
  },
});