import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, Star, Shield, Lock } from 'lucide-react-native';
import { useBrowserStore } from '../hooks/useBrowserStore';

export const AddressBar: React.FC = () => {
  const { currentUrl, isPrivateMode, isBookmarked, navigateToUrl, toggleBookmark } = useBrowserStore();
  const [inputValue, setInputValue] = useState(currentUrl);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      let url = inputValue.trim();
      
      // Check if it's a search query or URL
      if (!url.includes('.') || url.includes(' ')) {
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
      
      navigateToUrl(url);
    }
  };

  const isSecure = currentUrl.startsWith('https://');

  return (
    <View style={[styles.container, isPrivateMode && styles.privateContainer]}>
      <View style={[styles.addressBar, isPrivateMode && styles.privateAddressBar]}>
        <View style={styles.securityIcon}>
          {isPrivateMode ? (
            <Shield size={16} color="#8b5cf6" />
          ) : isSecure ? (
            <Lock size={16} color="#10b981" />
          ) : (
            <Search size={16} color="#6b7280" />
          )}
        </View>
        
        <TextInput
          style={[styles.input, isPrivateMode && styles.privateInput]}
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleSubmit}
          placeholder={isPrivateMode ? "Private browsing - search or enter address" : "Search or enter address"}
          placeholderTextColor={isPrivateMode ? "#9ca3af" : "#6b7280"}
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        {currentUrl && currentUrl !== 'atom://newtab' && (
          <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
            <Star 
              size={20} 
              color={isBookmarked ? "#f59e0b" : "#9ca3af"}
              fill={isBookmarked ? "#f59e0b" : "none"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  privateContainer: {
    backgroundColor: '#1f2937',
    borderBottomColor: '#374151',
  },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    height: 44,
  },
  privateAddressBar: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
  },
  securityIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 0,
  },
  privateInput: {
    color: '#ffffff',
  },
  bookmarkButton: {
    marginLeft: 12,
    padding: 4,
  },
});