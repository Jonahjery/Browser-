import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Clock, ExternalLink, Trash2 } from 'lucide-react-native';
import { useBrowserStore } from '../../hooks/useBrowserStore';

export default function HistoryTab() {
  const { history, clearHistory, navigateToUrl } = useBrowserStore();

  const handleHistoryPress = (url: string) => {
    navigateToUrl(url);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>History</Text>
          <Text style={styles.headerSubtitle}>{history.length} visits</Text>
        </View>
        {history.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {history.length === 0 ? (
          <View style={styles.emptyState}>
            <Clock size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No browsing history</Text>
            <Text style={styles.emptySubtitle}>
              Your browsing history will appear here as you visit websites
            </Text>
          </View>
        ) : (
          history.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.historyItem}
              onPress={() => handleHistoryPress(entry.url)}
            >
              <View style={styles.historyIcon}>
                <Clock size={20} color="#6b7280" />
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyTitle} numberOfLines={1}>
                  {entry.title}
                </Text>
                <Text style={styles.historyUrl} numberOfLines={1}>
                  {entry.url}
                </Text>
                <Text style={styles.historyTime}>
                  {formatDate(entry.visitedAt)}
                </Text>
              </View>
              <ExternalLink size={18} color="#9ca3af" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
  clearButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
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
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  historyUrl: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  historyTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
});