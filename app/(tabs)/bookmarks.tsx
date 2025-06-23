import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Bookmark, ExternalLink, Trash2 } from 'lucide-react-native';
import { useBrowserStore } from '../../hooks/useBrowserStore';

export default function BookmarksTab() {
  const { bookmarks, removeBookmark, navigateToUrl } = useBrowserStore();

  const handleBookmarkPress = (url: string) => {
    navigateToUrl(url);
  };

  const handleDeleteBookmark = (id: string) => {
    removeBookmark(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
        <Text style={styles.headerSubtitle}>{bookmarks.length} saved</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {bookmarks.length === 0 ? (
          <View style={styles.emptyState}>
            <Bookmark size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No bookmarks yet</Text>
            <Text style={styles.emptySubtitle}>
              Save your favorite websites by tapping the star icon in the address bar
            </Text>
          </View>
        ) : (
          bookmarks.map((bookmark) => (
            <TouchableOpacity
              key={bookmark.id}
              style={styles.bookmarkItem}
              onPress={() => handleBookmarkPress(bookmark.url)}
            >
              <View style={styles.bookmarkIcon}>
                <Bookmark size={20} color="#3b82f6" />
              </View>
              <View style={styles.bookmarkContent}>
                <Text style={styles.bookmarkTitle} numberOfLines={1}>
                  {bookmark.title}
                </Text>
                <Text style={styles.bookmarkUrl} numberOfLines={1}>
                  {bookmark.url}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteBookmark(bookmark.id)}
              >
                <Trash2 size={18} color="#ef4444" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  bookmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  bookmarkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookmarkContent: {
    flex: 1,
  },
  bookmarkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  bookmarkUrl: {
    fontSize: 14,
    color: '#6b7280',
  },
  deleteButton: {
    padding: 8,
  },
});