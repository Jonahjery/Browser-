import React, { useState, useEffect } from 'react';
import { Search, Shield, ShieldAlert, Star, Lock, Eye } from 'lucide-react';
import { useBrowserStore } from '../stores/browserStore';

export const AddressBar: React.FC = () => {
  const { tabs, activeTabId, navigateTab, addBookmark, bookmarks, isPrivateMode } = useBrowserStore();
  const [inputValue, setInputValue] = useState('');
  
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  
  useEffect(() => {
    if (activeTab && activeTab.url !== 'atom://newtab') {
      setInputValue(activeTab.url);
    } else {
      setInputValue('');
    }
  }, [activeTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className={`flex items-center space-x-2 px-4 py-2 border-b transition-all duration-200 ${
      isPrivateMode 
        ? 'bg-gray-900 border-purple-700/50' 
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }`}>
      <form onSubmit={handleSubmit} className="flex-1 flex items-center">
        <div className={`relative flex-1 flex items-center rounded-lg transition-all duration-200 ${
          isPrivateMode 
            ? 'bg-gray-800/80 border border-purple-500/30' 
            : 'bg-gray-100 dark:bg-gray-700'
        }`}>
          <div className="flex items-center pl-3">
            {isPrivateMode ? (
              <Eye className="w-4 h-4 text-purple-400" />
            ) : isSecure ? (
              <Shield className="w-4 h-4 text-green-500" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-red-500" />
            )}
          </div>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isPrivateMode ? "Private browsing - search or enter address" : "Search or enter address"}
            className={`flex-1 px-3 py-2 bg-transparent focus:outline-none transition-colors duration-200 ${
              isPrivateMode 
                ? 'text-white placeholder-purple-300' 
                : 'text-gray-900 dark:text-white placeholder-gray-500'
            }`}
          />
          
          <button
            type="button"
            onClick={handleBookmark}
            className={`p-2 rounded-r-lg transition-colors duration-200 ${
              isPrivateMode 
                ? 'hover:bg-purple-800/50' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Star 
              className={`w-4 h-4 ${
                isBookmarked 
                  ? 'text-yellow-500 fill-current' 
                  : isPrivateMode 
                    ? 'text-purple-400' 
                    : 'text-gray-400'
              }`} 
            />
          </button>
        </div>
      </form>
    </div>
  );
};