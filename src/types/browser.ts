export interface NavigationEntry {
  url: string;
  title: string;
  timestamp: number;
}

export interface NavigationHistory {
  entries: NavigationEntry[];
  currentIndex: number;
}

export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  isLoading: boolean;
  isActive: boolean;
  isPrivate: boolean;
  navigationHistory?: NavigationHistory;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  createdAt: Date;
}

export interface HistoryEntry {
  id: string;
  title: string;
  url: string;
  visitedAt: Date;
}

export interface QuickLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  color: string;
}

export interface BrowserState {
  tabs: Tab[];
  activeTabId: string | null;
  bookmarks: Bookmark[];
  history: HistoryEntry[];
  quickLinks: QuickLink[];
  isPrivateMode: boolean;
  theme: 'light' | 'dark' | 'system';
}