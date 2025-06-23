import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface QuickLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  color: string;
}

interface Bookmark {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
}

interface HistoryEntry {
  id: string;
  title: string;
  url: string;
  visitedAt: Date;
}

interface BrowserState {
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

interface BrowserActions {
  navigateToUrl: (url: string) => void;
  togglePrivateMode: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addBookmark: (title: string, url: string) => void;
  removeBookmark: (id: string) => void;
  toggleBookmark: () => void;
  clearBookmarks: () => void;
  addToHistory: (title: string, url: string) => void;
  clearHistory: () => void;
  addQuickLink: (link: Omit<QuickLink, 'id'>) => void;
  removeQuickLink: (id: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultQuickLinks: QuickLink[] = [
  { id: generateId(), title: 'Google', url: 'https://google.com', icon: 'G', color: '#3B82F6' },
  { id: generateId(), title: 'Wikipedia', url: 'https://wikipedia.org', icon: 'W', color: '#6B7280' },
  { id: generateId(), title: 'Amazon', url: 'https://amazon.com', icon: 'A', color: '#F97316' },
  { id: generateId(), title: 'Facebook', url: 'https://facebook.com', icon: 'F', color: '#1877F2' },
  { id: generateId(), title: 'X', url: 'https://x.com', icon: 'X', color: '#000000' },
  { id: generateId(), title: 'YouTube', url: 'https://youtube.com', icon: 'Y', color: '#EF4444' },
];

export const useBrowserStore = create<BrowserState & BrowserActions>()(
  persist(
    (set, get) => ({
      currentUrl: 'atom://newtab',
      currentTitle: 'New Tab',
      isLoading: false,
      isPrivateMode: false,
      theme: 'light',
      bookmarks: [],
      history: [],
      quickLinks: defaultQuickLinks,
      isBookmarked: false,

      navigateToUrl: (url: string) => {
        set({ currentUrl: url, isLoading: true });
        
        // Simulate loading
        setTimeout(() => {
          const title = url.includes('google.com') ? 'Google' :
                       url.includes('github.com') ? 'GitHub' :
                       url.includes('stackoverflow.com') ? 'Stack Overflow' :
                       url.includes('youtube.com') ? 'YouTube' :
                       url.includes('wikipedia.org') ? 'Wikipedia' :
                       url.includes('facebook.com') ? 'Facebook' :
                       url.includes('twitter.com') || url.includes('x.com') ? 'X (Twitter)' :
                       url.includes('amazon.com') ? 'Amazon' :
                       url === 'atom://newtab' ? 'New Tab' :
                       new URL(url).hostname;

          const state = get();
          const isBookmarked = state.bookmarks.some(bookmark => bookmark.url === url);
          
          set({ 
            isLoading: false, 
            currentTitle: title,
            isBookmarked
          });
          
          if (!state.isPrivateMode && url !== 'atom://newtab') {
            get().addToHistory(title, url);
          }
        }, 1000);
      },

      togglePrivateMode: () => {
        set((state) => ({ isPrivateMode: !state.isPrivateMode }));
      },

      setTheme: (theme: 'light' | 'dark') => {
        set({ theme });
      },

      addBookmark: (title: string, url: string) => {
        const bookmark: Bookmark = {
          id: generateId(),
          title,
          url,
          createdAt: new Date(),
        };

        set((state) => ({
          bookmarks: [...state.bookmarks, bookmark],
          isBookmarked: state.currentUrl === url ? true : state.isBookmarked
        }));
      },

      removeBookmark: (id: string) => {
        set((state) => {
          const removedBookmark = state.bookmarks.find(b => b.id === id);
          return {
            bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
            isBookmarked: removedBookmark?.url === state.currentUrl ? false : state.isBookmarked
          };
        });
      },

      toggleBookmark: () => {
        const state = get();
        const existingBookmark = state.bookmarks.find(b => b.url === state.currentUrl);
        
        if (existingBookmark) {
          get().removeBookmark(existingBookmark.id);
        } else if (state.currentUrl !== 'atom://newtab') {
          get().addBookmark(state.currentTitle, state.currentUrl);
        }
      },

      clearBookmarks: () => {
        set({ bookmarks: [], isBookmarked: false });
      },

      addToHistory: (title: string, url: string) => {
        const historyEntry: HistoryEntry = {
          id: generateId(),
          title,
          url,
          visitedAt: new Date(),
        };

        set((state) => ({
          history: [historyEntry, ...state.history.slice(0, 99)],
        }));
      },

      clearHistory: () => {
        set({ history: [] });
      },

      addQuickLink: (link: Omit<QuickLink, 'id'>) => {
        const newLink: QuickLink = {
          id: generateId(),
          ...link,
        };

        set((state) => ({
          quickLinks: [...state.quickLinks, newLink],
        }));
      },

      removeQuickLink: (id: string) => {
        set((state) => ({
          quickLinks: state.quickLinks.filter((link) => link.id !== id),
        }));
      },
    }),
    {
      name: 'atom-browser-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        history: state.history,
        quickLinks: state.quickLinks,
        theme: state.theme,
      }),
    }
  )
);