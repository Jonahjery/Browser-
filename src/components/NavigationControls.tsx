import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Home, Menu, Layers } from 'lucide-react';
import { useBrowserStore } from '../stores/browserStore';
import { BrowserMenu } from './BrowserMenu';
import { TabSwitcher } from './TabSwitcher';

export const NavigationControls: React.FC = () => {
  const { activeTabId, navigateTab, goBack, goForward, canGoBack, canGoForward } = useBrowserStore();

  const handleHome = () => {
    if (activeTabId) {
      navigateTab(activeTabId, 'atom://newtab');
    }
  };

  const handleRefresh = () => {
    if (activeTabId) {
      const activeTab = useBrowserStore.getState().tabs.find(tab => tab.id === activeTabId);
      if (activeTab && activeTab.url !== 'atom://newtab') {
        navigateTab(activeTabId, activeTab.url);
      }
    }
  };

  const handleBack = () => {
    if (activeTabId && canGoBack(activeTabId)) {
      goBack(activeTabId);
    }
  };

  const handleForward = () => {
    if (activeTabId && canGoForward(activeTabId)) {
      goForward(activeTabId);
    }
  };

  const canNavigateBack = activeTabId ? canGoBack(activeTabId) : false;
  const canNavigateForward = activeTabId ? canGoForward(activeTabId) : false;

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      {/* Left side navigation */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleBack}
          disabled={!canNavigateBack}
          className={`p-3 rounded-full transition-all duration-200 transform ${
            canNavigateBack 
              ? 'hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 text-gray-700 dark:text-gray-300' 
              : 'opacity-40 cursor-not-allowed text-gray-400 dark:text-gray-600'
          }`}
          title={canNavigateBack ? "Go back" : "Can't go back"}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={handleForward}
          disabled={!canNavigateForward}
          className={`p-3 rounded-full transition-all duration-200 transform ${
            canNavigateForward 
              ? 'hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 text-gray-700 dark:text-gray-300' 
              : 'opacity-40 cursor-not-allowed text-gray-400 dark:text-gray-600'
          }`}
          title={canNavigateForward ? "Go forward" : "Can't go forward"}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Center controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleRefresh}
          className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-110"
          title="Refresh"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        
        <button
          onClick={handleHome}
          className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-110"
          title="Home"
        >
          <Home className="w-6 h-6" />
        </button>

        {/* Tab Switcher */}
        <TabSwitcher />
      </div>

      {/* Right side menu */}
      <div className="flex items-center">
        <BrowserMenu />
      </div>
    </div>
  );
};