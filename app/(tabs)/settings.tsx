import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Settings, Shield, Moon, Sun, Trash2, Info, Globe } from 'lucide-react-native';
import { useBrowserStore } from '../../hooks/useBrowserStore';

export default function SettingsTab() {
  const { 
    isPrivateMode, 
    theme, 
    togglePrivateMode, 
    setTheme, 
    clearHistory,
    clearBookmarks 
  } = useBrowserStore();

  const settingSections = [
    {
      title: 'Privacy & Security',
      items: [
        {
          icon: Shield,
          title: 'Private Browsing',
          subtitle: 'Browse without saving history',
          type: 'toggle',
          value: isPrivateMode,
          onToggle: togglePrivateMode,
        },
      ],
    },
    {
      title: 'Appearance',
      items: [
        {
          icon: theme === 'dark' ? Moon : Sun,
          title: 'Theme',
          subtitle: theme === 'dark' ? 'Dark mode' : 'Light mode',
          type: 'toggle',
          value: theme === 'dark',
          onToggle: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
        },
      ],
    },
    {
      title: 'Data Management',
      items: [
        {
          icon: Trash2,
          title: 'Clear History',
          subtitle: 'Remove all browsing history',
          type: 'action',
          onPress: clearHistory,
          destructive: true,
        },
        {
          icon: Trash2,
          title: 'Clear Bookmarks',
          subtitle: 'Remove all saved bookmarks',
          type: 'action',
          onPress: clearBookmarks,
          destructive: true,
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          icon: Info,
          title: 'About Atom Browser',
          subtitle: 'Version 1.0.0',
          type: 'info',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your browsing experience</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      item.destructive && styles.destructiveItem,
                    ]}
                    onPress={item.onPress}
                    disabled={item.type === 'info'}
                  >
                    <View style={[
                      styles.settingIcon,
                      item.destructive && styles.destructiveIcon,
                    ]}>
                      <IconComponent 
                        size={20} 
                        color={item.destructive ? '#ef4444' : '#6b7280'} 
                      />
                    </View>
                    <View style={styles.settingContent}>
                      <Text style={[
                        styles.settingTitle,
                        item.destructive && styles.destructiveText,
                      ]}>
                        {item.title}
                      </Text>
                      <Text style={styles.settingSubtitle}>
                        {item.subtitle}
                      </Text>
                    </View>
                    {item.type === 'toggle' && (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                        thumbColor={item.value ? '#ffffff' : '#f3f4f6'}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  destructiveItem: {
    backgroundColor: '#fef2f2',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  destructiveIcon: {
    backgroundColor: '#fee2e2',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  destructiveText: {
    color: '#ef4444',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
});