import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrowserStore } from '../stores/browserStore';
import { useTheme } from '../hooks/useTheme';

const { width } = Dimensions.get('window');

export const AddressBar: React.FC = () => {
  const { tabs, activeTabId, navigateTab, addBookmark, bookmarks, isPrivateMode } = useBrowserStore();
  const [inputValue, setInputValue] = useState('');
  const { colors } = useTheme();
  
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  
  useEffect(() => {
    if (activeTab && activeTab.url !== 'atom://newtab') {
      setInputValue(activeTab.url);
    } else {
      setInputValue('');
    }
  }, [activeTab]);

  const handleSubmit = () => {
    if (!activeTabId || !inputValue.trim()) return;

    let url = inputValue.trim();
    
    // Check if it's a search query or URL
    if (!url.includes('.') || url.includes(' ')) {
      url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    navigateTab(activeTabId, url);
  };

  const isSecure = activeTab?.url.startsWith('https://');
  const isBookmarked = activeTab && bookmarks.some(bookmark => bookmark.url === activeTab.url);

  const handleBookmark = () => {
    if (activeTab && activeTab.url !== 'atom://newtab') {
      if (isBookmarked) {
        const bookmark = bookmarks.find(b => b.url === activeTab.url);
        if (bookmark) {
          useBrowserStore.getState().removeBookmark(bookmark.id);
        }
      } else {
        addBookmark(activeTab.title, activeTab.url);
      }
    }
  };

  // Only show address bar when not on new tab page
  if (activeTab?.url === 'atom://newtab') {
    return null;
  }

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: isPrivateMode ? colors.privateBackground : colors.surface,
        borderBottomColor: isPrivateMode ? colors.privateBorder : colors.border
      }
    ]}>
      <View style={[
        styles.addressBarContainer,
        { 
          backgroundColor: isPrivateMode ? colors.privateInput : colors.input,
          borderColor: isPrivateMode ? colors.privateBorder : colors.border
        }
      ]}>
        <View style={styles.securityIcon}>
          <Ionicons 
            name={isPrivateMode ? "eye" : isSecure ? "shield-checkmark" : "warning"} 
            size={16} 
            color={isPrivateMode ? colors.privatePrimary : isSecure ? colors.success : colors.warning} 
          />
        </View>
        
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleSubmit}
          placeholder={isPrivateMode ? "Private browsing - search or enter address" : "Search or enter address"}
          placeholderTextColor={colors.textSecondary}
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <TouchableOpacity onPress={handleBookmark} style={styles.bookmarkButton}>
          <Ionicons 
            name={isBookmarked ? "star" : "star-outline"} 
            size={20} 
            color={isBookmarked ? colors.warning : colors.textSecondary} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  addressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 44,
  },
  securityIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  bookmarkButton: {
    marginLeft: 12,
    padding: 4,
  },
});