import React from 'react';
import { Plus, X } from 'lucide-react';
import { useBrowserStore } from '../stores/browserStore';

export const TabBar: React.FC = () => {
  const { tabs, activeTabId, createTab, closeTab, setActiveTab, isPrivateMode } = useBrowserStore();
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const getDisplayUrl = (url: string) => {
    if (url === 'atom://newtab') return '';
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + urlObj.pathname;
    } catch {
      return url;
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
      {/* Left spacer */}
      <div className="w-12"></div>
      
      {/* Center URL Container */}
      <div className="flex-1 flex justify-center">
        {activeTab && activeTab.url !== 'atom://newtab' && (
          <div className="bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700 max-w-xs">
            <div className="text-sm text-gray-600 dark:text-gray-400 truncate text-center">
              {getDisplayUrl(activeTab.url)}
            </div>
          </div>
        )}
      </div>
      
      {/* Right side - Add Tab Button */}
      <button
        onClick={() => createTab('atom://newtab', isPrivateMode)}
        className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 hover:from-blue-100 hover:to-indigo-200 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-200 rounded-full flex items-center justify-center"
        title="New Tab"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};