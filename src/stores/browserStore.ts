import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Tab, Bookmark, HistoryEntry, QuickLink, BrowserState, NavigationHistory } from '../types/browser';

interface BrowserActions {
  createTab: (url?: string, isPrivate?: boolean) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  updateTab: (tabId: string, updates: Partial<Tab>) => void;
  navigateTab: (tabId: string, url: string) => void;
  goBack: (tabId: string) => void;
  goForward: (tabId: string) => void;
  canGoBack: (tabId: string) => boolean;
  canGoForward: (tabId: string) => boolean;
  addBookmark: (title: string, url: string) => void;
  removeBookmark: (bookmarkId: string) => void;
  addToHistory: (title: string, url: string) => void;
  clearHistory: () => void;
  togglePrivateMode: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addQuickLink: (link: Omit<QuickLink, 'id'>) => void;
  removeQuickLink: (id: string) => void;
  updateQuickLink: (id: string, updates: Partial<Omit<QuickLink, 'id'>>) => void;
  setWelcomeCompleted: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultTab: Tab = {
  id: generateId(),
  title: 'New Tab',
  url: 'atom://newtab',
  isLoading: false,
  isActive: true,
  isPrivate: false,
  navigationHistory: {
    entries: [{ url: 'atom://newtab', title: 'New Tab', timestamp: Date.now() }],
    currentIndex: 0
  }
};

const defaultQuickLinks: QuickLink[] = [
  { id: generateId(), title: 'Google', url: 'https://google.com', icon: '🔍', color: 'bg-blue-500' },
  { id: generateId(), title: 'Wikipedia', url: 'https://wikipedia.org', icon: 'W', color: 'bg-gray-600' },
  { id: generateId(), title: 'Amazon', url: 'https://amazon.com', icon: '📦', color: 'bg-orange-500' },
  { id: generateId(), title: 'Facebook', url: 'https://facebook.com', icon: 'f', color: 'bg-blue-600' },
  { id: generateId(), title: 'X', url: 'https://x.com', icon: 'X', color: 'bg-black' },
  { id: generateId(), title: 'Booking.com', url: 'https://booking.com', icon: 'B', color: 'bg-blue-700' },
  { id: generateId(), title: 'Weather', url: 'https://weather.com', icon: '☀️', color: 'bg-orange-400' },
  { id: generateId(), title: 'Opera', url: 'https://opera.com', icon: 'O', color: 'bg-red-500' },
];

export const useBrowserStore = create<BrowserState & BrowserActions & { hasCompletedWelcome: boolean }>()(
  persist(
    (set, get) => ({
      tabs: [defaultTab],
      activeTabId: defaultTab.id,
      bookmarks: [
        {
          id: generateId(),
          title: 'Google',
          url: 'https://google.com',
          createdAt: new Date(),
        },
        {
          id: generateId(),
          title: 'GitHub',
          url: 'https://github.com',
          createdAt: new Date(),
        },
      ],
      history: [],
      quickLinks: defaultQuickLinks,
      isPrivateMode: false,
      theme: 'system',
      hasCompletedWelcome: false,

      setWelcomeCompleted: () => {
        set({ hasCompletedWelcome: true });
      },

      createTab: (url = 'atom://newtab', isPrivate = false) => {
        const newTab: Tab = {
          id: generateId(),
          title: 'New Tab',
          url,
          isLoading: false,
          isActive: true,
          isPrivate,
          navigationHistory: {
            entries: [{ url, title: 'New Tab', timestamp: Date.now() }],
            currentIndex: 0
          }
        };

        set((state) => ({
          tabs: state.tabs.map((tab) => ({ ...tab, isActive: false })).concat(newTab),
          activeTabId: newTab.id,
          // Automatically switch to the appropriate mode based on the new tab
          isPrivateMode: isPrivate
        }));
      },

      closeTab: (tabId: string) => {
        set((state) => {
          const remainingTabs = state.tabs.filter((tab) => tab.id !== tabId);
          
          if (remainingTabs.length === 0) {
            const newTab: Tab = {
              id: generateId(),
              title: 'New Tab',
              url: 'atom://newtab',
              isLoading: false,
              isActive: true,
              isPrivate: false,
              navigationHistory: {
                entries: [{ url: 'atom://newtab', title: 'New Tab', timestamp: Date.now() }],
                currentIndex: 0
              }
            };
            return {
              tabs: [newTab],
              activeTabId: newTab.id,
              isPrivateMode: false
            };
          }

          let newActiveTabId = state.activeTabId;
          let newPrivateMode = state.isPrivateMode;
          
          if (state.activeTabId === tabId) {
            // Find the most recent tab to switch to
            newActiveTabId = remainingTabs[remainingTabs.length - 1].id;
            const newActiveTab = remainingTabs[remainingTabs.length - 1];
            newActiveTab.isActive = true;
            
            // Switch mode based on the new active tab
            newPrivateMode = newActiveTab.isPrivate;
          }

          return {
            tabs: remainingTabs,
            activeTabId: newActiveTabId,
            isPrivateMode: newPrivateMode
          };
        });
      },

      setActiveTab: (tabId: string) => {
        set((state) => {
          const targetTab = state.tabs.find(tab => tab.id === tabId);
          if (!targetTab) return state;

          return {
            tabs: state.tabs.map((tab) => ({
              ...tab,
              isActive: tab.id === tabId,
            })),
            activeTabId: tabId,
            // Automatically switch to the appropriate mode based on the selected tab
            isPrivateMode: targetTab.isPrivate
          };
        });
      },

      updateTab: (tabId: string, updates: Partial<Tab>) => {
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === tabId ? { ...tab, ...updates } : tab
          ),
        }));
      },

      navigateTab: (tabId: string, url: string) => {
        set((state) => {
          const updatedTabs = state.tabs.map((tab) => {
            if (tab.id === tabId) {
              // Create new navigation entry
              const newEntry = { url, title: 'Loading...', timestamp: Date.now() };
              const currentHistory = tab.navigationHistory || { entries: [], currentIndex: -1 };
              
              // Remove any forward history when navigating to a new page
              const newEntries = [
                ...currentHistory.entries.slice(0, currentHistory.currentIndex + 1),
                newEntry
              ];
              
              return {
                ...tab,
                url,
                isLoading: true,
                title: 'Loading...',
                navigationHistory: {
                  entries: newEntries,
                  currentIndex: newEntries.length - 1
                }
              };
            }
            return tab;
          });

          // Simulate loading and update title
          setTimeout(() => {
            const title = url.includes('google.com') ? 'Google' :
                         url.includes('github.com') ? 'GitHub' :
                         url.includes('stackoverflow.com') ? 'Stack Overflow' :
                         url.includes('youtube.com') ? 'YouTube' :
                         url.includes('wikipedia.org') ? 'Wikipedia' :
                         url.includes('facebook.com') ? 'Facebook' :
                         url.includes('twitter.com') || url.includes('x.com') ? 'X (Twitter)' :
                         url.includes('amazon.com') ? 'Amazon' :
                         url.includes('netflix.com') ? 'Netflix' :
                         url.includes('spotify.com') ? 'Spotify' :
                         url.includes('reddit.com') ? 'Reddit' :
                         url === 'atom://newtab' ? 'New Tab' :
                         new URL(url).hostname;

            get().updateTab(tabId, { 
              isLoading: false, 
              title,
              navigationHistory: {
                ...get().tabs.find(t => t.id === tabId)?.navigationHistory!,
                entries: get().tabs.find(t => t.id === tabId)?.navigationHistory?.entries.map((entry, index) => 
                  index === get().tabs.find(t => t.id === tabId)?.navigationHistory?.currentIndex 
                    ? { ...entry, title }
                    : entry
                ) || []
              }
            });
            
            if (!state.isPrivateMode) {
              get().addToHistory(title, url);
            }
          }, 1000);

          return { tabs: updatedTabs };
        });
      },

      goBack: (tabId: string) => {
        set((state) => {
          const tab = state.tabs.find(t => t.id === tabId);
          if (!tab || !tab.navigationHistory) return state;

          const { entries, currentIndex } = tab.navigationHistory;
          if (currentIndex <= 0) return state; // Can't go back further

          const newIndex = currentIndex - 1;
          const targetEntry = entries[newIndex];

          return {
            tabs: state.tabs.map(t => 
              t.id === tabId 
                ? {
                    ...t,
                    url: targetEntry.url,
                    title: targetEntry.title,
                    isLoading: false,
                    navigationHistory: {
                      ...t.navigationHistory!,
                      currentIndex: newIndex
                    }
                  }
                : t
            )
          };
        });
      },

      goForward: (tabId: string) => {
        set((state) => {
          const tab = state.tabs.find(t => t.id === tabId);
          if (!tab || !tab.navigationHistory) return state;

          const { entries, currentIndex } = tab.navigationHistory;
          if (currentIndex >= entries.length - 1) return state; // Can't go forward further

          const newIndex = currentIndex + 1;
          const targetEntry = entries[newIndex];

          return {
            tabs: state.tabs.map(t => 
              t.id === tabId 
                ? {
                    ...t,
                    url: targetEntry.url,
                    title: targetEntry.title,
                    isLoading: false,
                    navigationHistory: {
                      ...t.navigationHistory!,
                      currentIndex: newIndex
                    }
                  }
                : t
            )
          };
        });
      },

      canGoBack: (tabId: string) => {
        const state = get();
        const tab = state.tabs.find(t => t.id === tabId);
        return !!(tab?.navigationHistory && tab.navigationHistory.currentIndex > 0);
      },

      canGoForward: (tabId: string) => {
        const state = get();
        const tab = state.tabs.find(t => t.id === tabId);
        return !!(tab?.navigationHistory && tab.navigationHistory.currentIndex < tab.navigationHistory.entries.length - 1);
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
        }));
      },

      removeBookmark: (bookmarkId: string) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== bookmarkId),
        }));
      },

      addToHistory: (title: string, url: string) => {
        const historyEntry: HistoryEntry = {
          id: generateId(),
          title,
          url,
          visitedAt: new Date(),
        };

        set((state) => ({
          history: [historyEntry, ...state.history.slice(0, 99)], // Keep last 100 entries
        }));
      },

      clearHistory: () => {
        set({ history: [] });
      },

      togglePrivateMode: () => {
        set((state) => ({ isPrivateMode: !state.isPrivateMode }));
      },

      setTheme: (theme: 'light' | 'dark' | 'system') => {
        set({ theme });
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

      updateQuickLink: (id: string, updates: Partial<Omit<QuickLink, 'id'>>) => {
        set((state) => ({
          quickLinks: state.quickLinks.map((link) =>
            link.id === id ? { ...link, ...updates } : link
          ),
        }));
      },
    }),
    {
      name: 'atom-browser-storage',
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        history: state.history,
        quickLinks: state.quickLinks,
        theme: state.theme,
        hasCompletedWelcome: state.hasCompletedWelcome,
      }),
    }
  )
);