export interface QuickLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  color: string;
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

export interface BrowserState {
  currentUrl: string;
  currentTitle: string;
  isLoading: boolean;
  isPrivateMode: boolean;
  theme: 'light' | 'dark';
  bookmarks: Bookmark[];
  history: HistoryEntry[];
  quickLinks: QuickLink[];
  isBookmarked: boolean;
}