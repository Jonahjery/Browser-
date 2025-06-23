import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Shield, Plus, MoreHorizontal } from 'lucide-react-native';
import { useBrowserStore } from '../hooks/useBrowserStore';

export const BrowserHeader: React.FC = () => {
  const { isPrivateMode, togglePrivateMode } = useBrowserStore();

  return (
    <View style={[styles.container, isPrivateMode && styles.privateContainer]}>
      <View style={styles.leftSection}>
        <TouchableOpacity 
          style={[styles.privateButton, isPrivateMode && styles.privateButtonActive]}
          onPress={togglePrivateMode}
        >
          <Shield size={20} color={isPrivateMode ? '#ffffff' : '#6b7280'} />
        </TouchableOpacity>
      </View>

      <View style={styles.centerSection}>
        <Text style={[styles.title, isPrivateMode && styles.privateTitle]}>
          {isPrivateMode ? 'Private' : 'Atom Browser'}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.actionButton}>
          <Plus size={20} color={isPrivateMode ? '#ffffff' : '#6b7280'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MoreHorizontal size={20} color={isPrivateMode ? '#ffffff' : '#6b7280'} />
        </TouchableOpacity>
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  privateContainer: {
    backgroundColor: '#1f2937',
    borderBottomColor: '#374151',
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  privateTitle: {
    color: '#ffffff',
  },
  privateButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  privateButtonActive: {
    backgroundColor: '#8b5cf6',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});