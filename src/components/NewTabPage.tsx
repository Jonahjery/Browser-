import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useBrowserStore } from '../stores/browserStore';
import { useTheme } from '../hooks/useTheme';

const { width } = Dimensions.get('window');

export const NewTabPage: React.FC = () => {
  const { navigateTab, activeTabId, createTab, isPrivateMode, togglePrivateMode, quickLinks, addQuickLink, removeQuickLink, updateQuickLink } = useBrowserStore();
  const [searchValue, setSearchValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLink, setNewLink] = useState({ title: '', url: '', icon: '', color: '#3B82F6' });
  const [editLink, setEditLink] = useState({ title: '', url: '', icon: '', color: '#3B82F6' });
  const { colors } = useTheme();

  const MAX_QUICK_LINKS = 20;
  const isAtLimit = quickLinks.length >= MAX_QUICK_LINKS;

  const colorOptions = isPrivateMode 
    ? ['#8B5CF6', '#7C3AED', '#6D28D9', '#6366F1', '#5B21B6', '#EC4899', '#BE185D', '#9333EA', '#7E22CE', '#6B7280', '#374151', '#475569']
    : ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1', '#F97316', '#14B8A6', '#6B7280', '#000000', '#1E40AF'];

  const handleQuickLink = (url: string) => {
    if (activeTabId && !isEditing) {
      navigateTab(activeTabId, url);
    }
  };

  const handleSearch = () => {
    if (!activeTabId || !searchValue.trim()) return;

    let url = searchValue.trim();
    
    if (!url.includes('.') || url.includes(' ')) {
      url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    navigateTab(activeTabId, url);
  };

  const handlePrivateModeToggle = () => {
    togglePrivateMode();
    createTab('atom://newtab', !isPrivateMode);
  };

  const handleAddLink = () => {
    if (isAtLimit) return;
    
    if (newLink.title && newLink.url) {
      let url = newLink.url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
      
      addQuickLink({
        title: newLink.title,
        url: url,
        icon: newLink.icon || newLink.title.charAt(0).toUpperCase(),
        color: newLink.color
      });
      
      setNewLink({ title: '', url: '', icon: '', color: isPrivateMode ? '#8B5CF6' : '#3B82F6' });
      setShowAddForm(false);
    }
  };

  // Private Mode Design
  if (isPrivateMode) {
    return (
      <LinearGradient
        colors={['#111827', '#6B21B6', '#000000']}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.privateContent}>
          <View style={styles.privateHeader}>
            <TouchableOpacity
              onPress={handlePrivateModeToggle}
              style={styles.exitPrivateButton}
            >
              <Ionicons name="close" size={20} color="#A855F7" />
            </TouchableOpacity>
          </View>

          <View style={styles.privateCenterContent}>
            <Text style={styles.privateTitle}>You've gone private</Text>
            <Text style={styles.privateSubtitle}>
              Your browsing activity won't be saved to this device. Downloads and bookmarks will be saved.
            </Text>

            {/* Private Search Bar */}
            <View style={styles.privateSearchContainer}>
              <View style={styles.privateSearchIcon}>
                <Ionicons name="search" size={20} color="#A855F7" />
              </View>
              <TextInput
                style={styles.privateSearchInput}
                value={searchValue}
                onChangeText={setSearchValue}
                onSubmitEditing={handleSearch}
                placeholder="Search the web"
                placeholderTextColor="#A855F7"
                returnKeyType="search"
              />
            </View>

            {/* Private Features */}
            <View style={styles.privateFeatures}>
              {[
                { icon: 'eye', title: 'Private to you', desc: 'Other people who use this device won\'t see your activity' },
                { icon: 'shield-checkmark', title: 'Cleared when you\'re done', desc: 'Atom clears your browsing data when you close all private tabs' },
                { icon: 'globe', title: 'Not fully private', desc: 'Websites, your employer, or internet provider can still see your activity' }
              ].map((feature, index) => (
                <View key={index} style={styles.privateFeatureCard}>
                  <View style={styles.privateFeatureIcon}>
                    <Ionicons name={feature.icon as any} size={12} color="#A855F7" />
                  </View>
                  <Text style={styles.privateFeatureTitle}>{feature.title}</Text>
                  <Text style={styles.privateFeatureDesc}>{feature.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  // Normal Mode Design
  return (
    <LinearGradient
      colors={[colors.background, colors.surface]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* Private Mode Toggle Button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handlePrivateModeToggle}
            style={[styles.privateModeButton, { borderColor: colors.border }]}
          >
            <Ionicons name="shield" size={24} color={colors.primary} />
            <View style={styles.privateModeIndicator} />
          </TouchableOpacity>
        </View>

        <View style={styles.centerContent}>
          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              value={searchValue}
              onChangeText={setSearchValue}
              onSubmitEditing={handleSearch}
              placeholder="Search or enter URL"
              placeholderTextColor={colors.textSecondary}
              returnKeyType="search"
            />
          </View>

          {/* Quick Access Section */}
          <View style={styles.quickAccessSection}>
            <View style={styles.quickAccessHeader}>
              <Text style={[styles.quickAccessTitle, { color: colors.text }]}>
                Quick access
              </Text>
              <Text style={[styles.quickAccessCount, { color: colors.textSecondary }]}>
                ({quickLinks.length}/{MAX_QUICK_LINKS})
              </Text>
              <TouchableOpacity 
                onPress={() => setIsEditing(!isEditing)}
                style={[styles.editButton, { backgroundColor: isEditing ? colors.primary : 'transparent' }]}
              >
                <Ionicons 
                  name={isEditing ? "checkmark" : "create"} 
                  size={20} 
                  color={isEditing ? '#FFFFFF' : colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>

            {/* Limit Warning */}
            {isAtLimit && (
              <View style={[styles.limitWarning, { backgroundColor: colors.warning + '20', borderColor: colors.warning }]}>
                <Ionicons name="warning" size={16} color={colors.warning} />
                <Text style={[styles.limitWarningText, { color: colors.warning }]}>
                  You've reached the maximum of {MAX_QUICK_LINKS} quick access links.
                </Text>
              </View>
            )}
            
            {/* Quick Links Grid */}
            <View style={styles.quickLinksGrid}>
              {quickLinks.map((link, index) => (
                <View key={link.id} style={styles.quickLinkContainer}>
                  {editingId === link.id ? (
                    <View style={[styles.editForm, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                      <TextInput
                        style={[styles.editInput, { backgroundColor: colors.input, color: colors.text }]}
                        placeholder="Title"
                        value={editLink.title}
                        onChangeText={(text) => setEditLink({ ...editLink, title: text })}
                        placeholderTextColor={colors.textSecondary}
                      />
                      <TextInput
                        style={[styles.editInput, { backgroundColor: colors.input, color: colors.text }]}
                        placeholder="URL"
                        value={editLink.url}
                        onChangeText={(text) => setEditLink({ ...editLink, url: text })}
                        placeholderTextColor={colors.textSecondary}
                      />
                      <TextInput
                        style={[styles.editInput, { backgroundColor: colors.input, color: colors.text }]}
                        placeholder="Icon (emoji or letter)"
                        value={editLink.icon}
                        onChangeText={(text) => setEditLink({ ...editLink, icon: text })}
                        placeholderTextColor={colors.textSecondary}
                      />
                      <View style={styles.colorPicker}>
                        {colorOptions.slice(0, 6).map((color) => (
                          <TouchableOpacity
                            key={color}
                            onPress={() => setEditLink({ ...editLink, color })}
                            style={[
                              styles.colorOption,
                              { backgroundColor: color },
                              editLink.color === color && styles.selectedColor
                            ]}
                          />
                        ))}
                      </View>
                      <View style={styles.editActions}>
                        <TouchableOpacity
                          onPress={() => {
                            if (editLink.title && editLink.url) {
                              let url = editLink.url;
                              if (!url.startsWith('http://') && !url.startsWith('https://')) {
                                url = `https://${url}`;
                              }
                              updateQuickLink(link.id, {
                                title: editLink.title,
                                url: url,
                                icon: editLink.icon || editLink.title.charAt(0).toUpperCase(),
                                color: editLink.color
                              });
                              setEditingId(null);
                            }
                          }}
                          style={[styles.saveButton, { backgroundColor: colors.primary }]}
                        >
                          <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setEditingId(null)}
                          style={[styles.cancelButton, { backgroundColor: colors.surface }]}
                        >
                          <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => isEditing ? setEditingId(link.id) : handleQuickLink(link.url)}
                      style={[styles.quickLink, { backgroundColor: colors.surface }]}
                    >
                      <View style={[styles.quickLinkIcon, { backgroundColor: link.color }]}>
                        <Text style={styles.quickLinkIconText}>{link.icon}</Text>
                      </View>
                      <Text style={[styles.quickLinkTitle, { color: colors.text }]} numberOfLines={2}>
                        {link.title}
                      </Text>
                      
                      {isEditing && (
                        <TouchableOpacity
                          onPress={() => removeQuickLink(link.id)}
                          style={styles.deleteButton}
                        >
                          <Ionicons name="close" size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              {/* Add Button */}
              {showAddForm ? (
                <View style={[styles.addForm, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <TextInput
                    style={[styles.editInput, { backgroundColor: colors.input, color: colors.text }]}
                    placeholder="Title"
                    value={newLink.title}
                    onChangeText={(text) => setNewLink({ ...newLink, title: text })}
                    placeholderTextColor={colors.textSecondary}
                  />
                  <TextInput
                    style={[styles.editInput, { backgroundColor: colors.input, color: colors.text }]}
                    placeholder="URL"
                    value={newLink.url}
                    onChangeText={(text) => setNewLink({ ...newLink, url: text })}
                    placeholderTextColor={colors.textSecondary}
                  />
                  <TextInput
                    style={[styles.editInput, { backgroundColor: colors.input, color: colors.text }]}
                    placeholder="Icon (emoji or letter)"
                    value={newLink.icon}
                    onChangeText={(text) => setNewLink({ ...newLink, icon: text })}
                    placeholderTextColor={colors.textSecondary}
                  />
                  <View style={styles.colorPicker}>
                    {colorOptions.slice(0, 6).map((color) => (
                      <TouchableOpacity
                        key={color}
                        onPress={() => setNewLink({ ...newLink, color })}
                        style={[
                          styles.colorOption,
                          { backgroundColor: color },
                          newLink.color === color && styles.selectedColor
                        ]}
                      />
                    ))}
                  </View>
                  <View style={styles.editActions}>
                    <TouchableOpacity
                      onPress={handleAddLink}
                      disabled={isAtLimit}
                      style={[styles.saveButton, { backgroundColor: colors.primary, opacity: isAtLimit ? 0.5 : 1 }]}
                    >
                      <Text style={styles.saveButtonText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setShowAddForm(false);
                        setNewLink({ title: '', url: '', icon: '', color: '#3B82F6' });
                      }}
                      style={[styles.cancelButton, { backgroundColor: colors.surface }]}
                    >
                      <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity 
                  onPress={() => !isAtLimit && setShowAddForm(true)}
                  disabled={isAtLimit}
                  style={[
                    styles.addButton, 
                    { backgroundColor: colors.surface, opacity: isAtLimit ? 0.5 : 1 }
                  ]}
                >
                  <Ionicons name="add" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  header: {
    alignItems: 'flex-end',
    paddingTop: 16,
    paddingBottom: 8,
  },
  privateHeader: {
    alignItems: 'flex-end',
    paddingTop: 16,
  },
  privateModeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  privateModeIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8B5CF6',
  },
  exitPrivateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
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
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  privateSubtitle: {
    fontSize: 16,
    color: '#A855F7',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 320,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 20,
    height: 50,
    marginBottom: 32,
  },
  privateSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(55, 65, 81, 0.6)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    paddingHorizontal: 20,
    height: 50,
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
  },
  searchIcon: {
    marginRight: 12,
  },
  privateSearchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  privateSearchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
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
    backgroundColor: 'rgba(55, 65, 81, 0.4)',
    borderRadius: 12,
    padding: 12,
    width: (width - 80) / 3,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  privateFeatureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  privateFeatureTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  privateFeatureDesc: {
    fontSize: 10,
    color: '#A855F7',
    textAlign: 'center',
    lineHeight: 14,
  },
  quickAccessSection: {
    marginTop: 16,
  },
  quickAccessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickAccessTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  quickAccessCount: {
    fontSize: 14,
    marginRight: 12,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  limitWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  limitWarningText: {
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickLinkContainer: {
    width: (width - 56) / 4,
  },
  quickLink: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    color: '#FFFFFF',
  },
  quickLinkTitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  deleteButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: (width - 56) / 4,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
  },
  editForm: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    width: (width - 32),
    marginBottom: 12,
  },
  addForm: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    width: (width - 32),
    marginBottom: 12,
  },
  editInput: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  colorPicker: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  colorOption: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  cancelButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
});