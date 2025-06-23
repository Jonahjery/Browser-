import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Search, Globe, Shield, Plus, X } from 'lucide-react-native';
import { useBrowserStore } from '../hooks/useBrowserStore';

export const NewTabPage: React.FC = () => {
  const { isPrivateMode, navigateToUrl, quickLinks, addQuickLink, removeQuickLink } = useBrowserStore();
  const [searchValue, setSearchValue] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const handleSearch = () => {
    if (searchValue.trim()) {
      let url = searchValue.trim();
      
      if (!url.includes('.') || url.includes(' ')) {
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
      
      navigateToUrl(url);
    }
  };

  const handleQuickLink = (url: string) => {
    navigateToUrl(url);
  };

  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      let url = newLink.url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
      
      addQuickLink({
        title: newLink.title,
        url: url,
        icon: newLink.title.charAt(0).toUpperCase(),
        color: isPrivateMode ? '#8b5cf6' : '#3b82f6'
      });
      
      setNewLink({ title: '', url: '' });
      setShowAddForm(false);
    }
  };

  if (isPrivateMode) {
    return (
      <View style={styles.privateContainer}>
        <ScrollView contentContainerStyle={styles.privateContent}>
          <View style={styles.privateCenterContent}>
            <Shield size={64} color="#8b5cf6" />
            <Text style={styles.privateTitle}>You've gone private</Text>
            <Text style={styles.privateSubtitle}>
              Your browsing activity won't be saved to this device. Downloads and bookmarks will be saved.
            </Text>

            <View style={styles.privateSearchContainer}>
              <Search size={20} color="#8b5cf6" style={styles.searchIcon} />
              <TextInput
                style={styles.privateSearchInput}
                value={searchValue}
                onChangeText={setSearchValue}
                onSubmitEditing={handleSearch}
                placeholder="Search the web"
                placeholderTextColor="#9ca3af"
                returnKeyType="search"
              />
            </View>

            <View style={styles.privateFeatures}>
              {[
                { icon: '👁️', title: 'Private to you', desc: 'Other people who use this device won\'t see your activity' },
                { icon: '🗑️', title: 'Cleared when you\'re done', desc: 'Atom clears your browsing data when you close private tabs' },
                { icon: '🌐', title: 'Not fully private', desc: 'Websites, your employer, or internet provider can still see your activity' }
              ].map((feature, index) => (
                <View key={index} style={styles.privateFeatureCard}>
                  <Text style={styles.privateFeatureIcon}>{feature.icon}</Text>
                  <Text style={styles.privateFeatureTitle}>{feature.title}</Text>
                  <Text style={styles.privateFeatureDesc}>{feature.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.centerContent}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchValue}
            onChangeText={setSearchValue}
            onSubmitEditing={handleSearch}
            placeholder="Search or enter URL"
            placeholderTextColor="#6b7280"
            returnKeyType="search"
          />
        </View>

        <View style={styles.quickAccessSection}>
          <Text style={styles.quickAccessTitle}>Quick access</Text>
          
          <View style={styles.quickLinksGrid}>
            {quickLinks.map((link) => (
              <TouchableOpacity
                key={link.id}
                style={styles.quickLink}
                onPress={() => handleQuickLink(link.url)}
              >
                <View style={[styles.quickLinkIcon, { backgroundColor: link.color }]}>
                  <Text style={styles.quickLinkIconText}>{link.icon}</Text>
                </View>
                <Text style={styles.quickLinkTitle} numberOfLines={2}>
                  {link.title}
                </Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeQuickLink(link.id)}
                >
                  <X size={12} color="#ffffff" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

            {showAddForm ? (
              <View style={styles.addForm}>
                <TextInput
                  style={styles.addInput}
                  placeholder="Title"
                  value={newLink.title}
                  onChangeText={(text) => setNewLink({ ...newLink, title: text })}
                  placeholderTextColor="#6b7280"
                />
                <TextInput
                  style={styles.addInput}
                  placeholder="URL"
                  value={newLink.url}
                  onChangeText={(text) => setNewLink({ ...newLink, url: text })}
                  placeholderTextColor="#6b7280"
                />
                <View style={styles.addActions}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddLink}
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setShowAddForm(false);
                      setNewLink({ title: '', url: '' });
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.addQuickLink}
                onPress={() => setShowAddForm(true)}
              >
                <Plus size={24} color="#6b7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
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
    flex: 1,
    backgroundColor: '#1f2937',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  privateContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 32,
  },
  privateCenterContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  privateTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  privateSubtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 320,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 20,
    height: 50,
    marginBottom: 32,
  },
  privateSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#4b5563',
    paddingHorizontal: 20,
    height: 50,
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 0,
  },
  privateSearchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    paddingVertical: 0,
  },
  privateFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    maxWidth: 600,
  },
  privateFeatureCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    width: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  privateFeatureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  privateFeatureTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  privateFeatureDesc: {
    fontSize: 10,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 14,
  },
  quickAccessSection: {
    marginTop: 16,
  },
  quickAccessTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickLink: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    width: 80,
    position: 'relative',
  },
  quickLinkIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickLinkIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  quickLinkTitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    color: '#111827',
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addQuickLink: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    backgroundColor: '#f9fafb',
  },
  addForm: {
    width: 200,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  addInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  addActions: {
    flexDirection: 'row',
    gap: 8,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  cancelButtonText: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 14,
  },
});