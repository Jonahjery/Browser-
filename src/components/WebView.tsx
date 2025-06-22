import React from 'react';
import { useBrowserStore } from '../stores/browserStore';
import { NewTabPage } from './NewTabPage';

export const WebView: React.FC = () => {
  const { tabs, activeTabId, isPrivateMode } = useBrowserStore();
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  if (!activeTab) return null;

  if (activeTab.url === 'atom://newtab') {
    return <NewTabPage />;
  }

  return (
    <div className={`h-full flex flex-col transition-all duration-300 ${
      isPrivateMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black' 
        : 'bg-white dark:bg-gray-900'
    }`}>
      <div className="flex-1 flex items-start justify-center overflow-y-auto">
        <div className="text-center p-8 max-w-md mx-auto w-full min-h-full flex flex-col justify-center">
          <div className="mb-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ${
              isPrivateMode 
                ? 'bg-gradient-to-br from-purple-600 to-purple-800 border-2 border-purple-500/50' 
                : 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800'
            }`}>
              <div className={`w-10 h-10 rounded-full ${
                isPrivateMode ? 'bg-purple-300' : 'bg-blue-500'
              }`}></div>
            </div>
          </div>
          
          <h2 className={`text-2xl font-bold mb-3 ${
            isPrivateMode ? 'text-white' : 'text-gray-900 dark:text-white'
          }`}>
            {activeTab.isLoading ? 'Loading...' : activeTab.title}
          </h2>
          
          <p className={`mb-6 break-all text-sm font-mono px-4 py-2 rounded-lg ${
            isPrivateMode 
              ? 'text-purple-200 bg-gray-800/50 border border-purple-500/30' 
              : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
          }`}>
            {activeTab.url}
          </p>
          
          {activeTab.isLoading && (
            <div className="mb-6">
              <div className={`w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mx-auto ${
                isPrivateMode 
                  ? 'border-purple-500' 
                  : 'border-blue-500'
              }`}></div>
            </div>
          )}
          
          {!activeTab.isLoading && (
            <div className={`text-sm leading-relaxed ${
              isPrivateMode ? 'text-purple-300' : 'text-gray-500 dark:text-gray-400'
            }`}>
              <div className={`p-4 rounded-xl mb-4 ${
                isPrivateMode 
                  ? 'bg-gray-800/40 border border-purple-500/20' 
                  : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}>
                <p className="mb-2">
                  This is a demo browser. In a real implementation, this would display the actual webpage content.
                </p>
                {isPrivateMode && (
                  <p className={`text-xs mt-3 p-3 rounded-lg ${
                    'bg-purple-900/30 text-purple-200 border border-purple-600/30'
                  }`}>
                    🔒 Private browsing: Your activity on this site won't be saved to your browsing history.
                  </p>
                )}
              </div>
              
              {/* Simulated webpage preview */}
              <div className={`text-left p-4 rounded-xl border-2 border-dashed ${
                isPrivateMode 
                  ? 'border-purple-600/50 bg-gray-800/20' 
                  : 'border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/50'
              }`}>
                <div className={`text-xs font-bold mb-3 ${
                  isPrivateMode ? 'text-purple-200' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  Simulated webpage content:
                </div>
                <div className={`space-y-3 text-xs ${
                  isPrivateMode ? 'text-purple-300' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  <div className={`h-3 rounded ${
                    isPrivateMode ? 'bg-purple-700/30' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                  <div className={`h-3 rounded w-3/4 ${
                    isPrivateMode ? 'bg-purple-700/30' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                  <div className={`h-3 rounded w-1/2 ${
                    isPrivateMode ? 'bg-purple-700/30' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                  <div className={`h-3 rounded w-5/6 ${
                    isPrivateMode ? 'bg-purple-700/30' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                  <div className={`h-3 rounded w-2/3 ${
                    isPrivateMode ? 'bg-purple-700/30' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                  <div className={`h-3 rounded w-4/5 ${
                    isPrivateMode ? 'bg-purple-700/30' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                  <div className={`h-3 rounded w-1/3 ${
                    isPrivateMode ? 'bg-purple-700/30' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                  <div className={`h-3 rounded w-3/5 ${
                    isPrivateMode ? 'bg-purple-700/30' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                </div>
              </div>
              
              {/* Additional content to demonstrate scrolling */}
              <div className={`mt-6 p-4 rounded-xl ${
                isPrivateMode 
                  ? 'bg-gray-800/30 border border-purple-500/20' 
                  : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}>
                <div className={`text-xs font-bold mb-2 ${
                  isPrivateMode ? 'text-purple-200' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  More content below:
                </div>
                <div className={`space-y-2 text-xs ${
                  isPrivateMode ? 'text-purple-300' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  <div className={`h-2 rounded ${
                    isPrivateMode ? 'bg-purple-700/30' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                  <div className={`h-2 rounded w-2/3 ${
                    isPrivateMode ? 'bg-purple-700/30' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                  <div className={`h-2 rounded w-4/5 ${
                    isPrivateMode ? 'bg-purple-700/30' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};