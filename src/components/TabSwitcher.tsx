import React, { useState } from 'react';
import { Layers, X, Plus, UserX, Globe, Lock, Eye } from 'lucide-react';
import { useBrowserStore } from '../stores/browserStore';

export const TabSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deletingTabId, setDeletingTabId] = useState<string | null>(null);
  const { tabs, activeTabId, setActiveTab, closeTab, createTab, isPrivateMode } = useBrowserStore();

  const handleTabClick = (tabId: string) => {
    if (deletingTabId === tabId) return; // Prevent clicking while deleting
    setActiveTab(tabId);
    setIsOpen(false);
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    setDeletingTabId(tabId);
    
    // Add a small delay for visual feedback
    setTimeout(() => {
      closeTab(tabId);
      setDeletingTabId(null);
    }, 200);
  };

  const handleNewTab = () => {
    createTab('atom://newtab', isPrivateMode);
    setIsOpen(false);
  };

  const getTabTitle = (tab: any) => {
    if (tab.url === 'atom://newtab') return 'New Tab';
    return tab.title || 'Loading...';
  };

  const getTabUrl = (tab: any) => {
    if (tab.url === 'atom://newtab') return '';
    try {
      const urlObj = new URL(tab.url);
      return urlObj.hostname;
    } catch {
      return tab.url;
    }
  };

  const getFavicon = (tab: any) => {
    if (tab.url === 'atom://newtab') return tab.isPrivate ? '🔒' : '🏠';
    if (tab.url.includes('google.com')) return '🔍';
    if (tab.url.includes('github.com')) return '🐙';
    if (tab.url.includes('youtube.com')) return '📺';
    if (tab.url.includes('wikipedia.org')) return '📖';
    if (tab.url.includes('stackoverflow.com')) return '💻';
    if (tab.url.includes('facebook.com')) return '📘';
    if (tab.url.includes('twitter.com') || tab.url.includes('x.com')) return '🐦';
    if (tab.url.includes('amazon.com')) return '📦';
    if (tab.url.includes('netflix.com')) return '🎬';
    if (tab.url.includes('spotify.com')) return '🎵';
    if (tab.url.includes('reddit.com')) return '🤖';
    return tab.isPrivate ? '🔒' : '🌐';
  };

  const privateTabs = tabs.filter(tab => tab.isPrivate);
  const normalTabs = tabs.filter(tab => !tab.isPrivate);

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-110 relative"
          title="Tab Switcher"
        >
          <Layers className="w-6 h-6" />
          {tabs.length > 1 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              {tabs.length}
            </div>
          )}
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fadeIn" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Tab Switcher Modal - Enhanced for Private Mode */}
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-slideUp">
              <div className={`w-full rounded-2xl shadow-2xl border max-h-[70vh] overflow-hidden transition-all duration-300 ${
                isPrivateMode 
                  ? 'bg-gray-900 border-purple-700/50' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}>
                {/* Header */}
                <div className={`p-6 border-b transition-all duration-200 ${
                  isPrivateMode 
                    ? 'bg-gradient-to-r from-purple-900/50 to-gray-900 border-purple-700/50' 
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className={`text-xl font-bold transition-colors duration-200 ${
                          isPrivateMode ? 'text-white' : 'text-gray-900 dark:text-white'
                        }`}>
                          Open Tabs
                        </h3>
                        {isPrivateMode && (
                          <div className="flex items-center space-x-1 px-2 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full">
                            <Lock className="w-3 h-3 text-purple-300" />
                            <span className="text-xs font-bold text-purple-200">PRIVATE</span>
                          </div>
                        )}
                      </div>
                      <p className={`text-sm mt-1 transition-colors duration-200 ${
                        isPrivateMode ? 'text-purple-300' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {tabs.length} tab{tabs.length !== 1 ? 's' : ''} currently open
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setIsOpen(false)}
                        className={`text-sm font-medium transition-colors duration-200 px-4 py-2 rounded-lg ${
                          isPrivateMode 
                            ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-800/30' 
                            : 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                        }`}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tabs Grid - Enhanced for Private Mode */}
                <div className="p-6 max-h-[50vh] overflow-y-auto">
                  {/* Private Tabs Section */}
                  {privateTabs.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Lock className="w-4 h-4 text-purple-400" />
                        <h4 className="text-sm font-bold text-purple-300">Private Tabs ({privateTabs.length})</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {privateTabs.map((tab, index) => (
                          <div
                            key={tab.id}
                            className={`relative group animate-fadeInUp ${
                              deletingTabId === tab.id ? 'animate-pulse opacity-50' : ''
                            }`}
                            style={{
                              animationDelay: `${index * 100}ms`
                            }}
                          >
                            <button
                              onClick={() => handleTabClick(tab.id)}
                              disabled={deletingTabId === tab.id}
                              className={`w-full p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border-2 ${
                                tab.id === activeTabId 
                                  ? 'bg-gradient-to-br from-purple-900/50 to-gray-900/50 border-purple-500/50 shadow-lg shadow-purple-500/20' 
                                  : 'bg-gray-800/60 border-purple-700/30 hover:border-purple-500/50'
                              } ${deletingTabId === tab.id ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              {/* Private Tab Preview Card */}
                              <div className="flex flex-col space-y-3">
                                {/* Top Row - Favicon and Close */}
                                <div className="flex items-center justify-between">
                                  <div className="w-10 h-10 bg-purple-800/50 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm border border-purple-600/30">
                                    {tab.isLoading ? (
                                      <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                                    ) : deletingTabId === tab.id ? (
                                      <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                      getFavicon(tab)
                                    )}
                                  </div>
                                  
                                  {/* Enhanced Close Button for Private */}
                                  {tabs.length > 1 && (
                                    <div className="flex items-center space-x-1">
                                      <button
                                        onClick={(e) => handleCloseTab(e, tab.id)}
                                        disabled={deletingTabId === tab.id}
                                        className={`p-2 rounded-lg transition-all duration-200 ${
                                          deletingTabId === tab.id
                                            ? 'bg-red-900/30 text-red-400 cursor-not-allowed'
                                            : 'opacity-70 group-hover:opacity-100 hover:bg-red-900/30 text-red-400 hover:text-red-300 hover:scale-110'
                                        }`}
                                        title={deletingTabId === tab.id ? 'Closing...' : 'Close Private Tab'}
                                      >
                                        {deletingTabId === tab.id ? (
                                          <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                          <X className="w-4 h-4" />
                                        )}
                                      </button>
                                    </div>
                                  )}
                                </div>

                                {/* Tab Content */}
                                <div className="text-left space-y-2">
                                  {/* Title Row with Private Indicator */}
                                  <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 bg-purple-700/50 rounded-full flex items-center justify-center border border-purple-500/50">
                                      <UserX className="w-3 h-3 text-purple-300" />
                                    </div>
                                    <h4 className={`font-semibold text-white text-sm leading-tight line-clamp-2 ${
                                      deletingTabId === tab.id ? 'opacity-50' : ''
                                    }`}>
                                      {deletingTabId === tab.id ? 'Closing...' : getTabTitle(tab)}
                                    </h4>
                                  </div>
                                  
                                  {/* URL */}
                                  {getTabUrl(tab) && !deletingTabId && (
                                    <div className="flex items-center space-x-1">
                                      <Eye className="w-3 h-3 text-purple-400 flex-shrink-0" />
                                      <p className="text-xs text-purple-300 truncate">
                                        {getTabUrl(tab)}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                {/* Active Indicator */}
                                {tab.id === activeTabId && deletingTabId !== tab.id && (
                                  <div className="absolute top-2 left-2 w-3 h-3 bg-purple-400 rounded-full shadow-lg animate-pulse"></div>
                                )}

                                {/* Deleting Indicator */}
                                {deletingTabId === tab.id && (
                                  <div className="absolute top-2 left-2 w-3 h-3 bg-red-400 rounded-full shadow-lg animate-pulse"></div>
                                )}
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Normal Tabs Section */}
                  {normalTabs.length > 0 && (
                    <div className="mb-4">
                      {privateTabs.length > 0 && (
                        <div className="flex items-center space-x-2 mb-4">
                          <Globe className={`w-4 h-4 ${isPrivateMode ? 'text-gray-400' : 'text-blue-500'}`} />
                          <h4 className={`text-sm font-bold ${isPrivateMode ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'}`}>
                            Normal Tabs ({normalTabs.length})
                          </h4>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        {normalTabs.map((tab, index) => (
                          <div
                            key={tab.id}
                            className={`relative group animate-fadeInUp ${
                              deletingTabId === tab.id ? 'animate-pulse opacity-50' : ''
                            }`}
                            style={{
                              animationDelay: `${(privateTabs.length + index) * 100}ms`
                            }}
                          >
                            <button
                              onClick={() => handleTabClick(tab.id)}
                              disabled={deletingTabId === tab.id}
                              className={`w-full p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border-2 ${
                                tab.id === activeTabId 
                                  ? isPrivateMode
                                    ? 'bg-gray-800/60 border-gray-600 shadow-md'
                                    : 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-300 dark:border-blue-600 shadow-md'
                                  : isPrivateMode
                                    ? 'bg-gray-800/40 border-gray-700 hover:border-gray-600'
                                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                              } ${deletingTabId === tab.id ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              {/* Normal Tab Preview Card */}
                              <div className="flex flex-col space-y-3">
                                {/* Top Row - Favicon and Close */}
                                <div className="flex items-center justify-between">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm ${
                                    isPrivateMode ? 'bg-gray-700' : 'bg-gray-100 dark:bg-gray-600'
                                  }`}>
                                    {tab.isLoading ? (
                                      <div className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${
                                        isPrivateMode ? 'border-gray-400' : 'border-blue-500'
                                      }`}></div>
                                    ) : deletingTabId === tab.id ? (
                                      <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                      getFavicon(tab)
                                    )}
                                  </div>
                                  
                                  {/* Enhanced Close Button */}
                                  {tabs.length > 1 && (
                                    <div className="flex items-center space-x-1">
                                      <button
                                        onClick={(e) => handleCloseTab(e, tab.id)}
                                        disabled={deletingTabId === tab.id}
                                        className={`p-2 rounded-lg transition-all duration-200 ${
                                          deletingTabId === tab.id
                                            ? 'bg-red-100 dark:bg-red-900/30 text-red-400 cursor-not-allowed'
                                            : 'opacity-70 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 hover:text-red-600 hover:scale-110'
                                        }`}
                                        title={deletingTabId === tab.id ? 'Closing...' : 'Close Tab'}
                                      >
                                        {deletingTabId === tab.id ? (
                                          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                          <X className="w-4 h-4" />
                                        )}
                                      </button>
                                    </div>
                                  )}
                                </div>

                                {/* Tab Content */}
                                <div className="text-left space-y-2">
                                  {/* Title Row */}
                                  <div className="flex items-center space-x-2">
                                    <h4 className={`font-semibold text-sm leading-tight line-clamp-2 ${
                                      deletingTabId === tab.id ? 'opacity-50' : ''
                                    } ${isPrivateMode ? 'text-gray-200' : 'text-gray-900 dark:text-white'}`}>
                                      {deletingTabId === tab.id ? 'Closing...' : getTabTitle(tab)}
                                    </h4>
                                  </div>
                                  
                                  {/* URL */}
                                  {getTabUrl(tab) && !deletingTabId && (
                                    <div className="flex items-center space-x-1">
                                      <Globe className={`w-3 h-3 flex-shrink-0 ${isPrivateMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                      <p className={`text-xs truncate ${isPrivateMode ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {getTabUrl(tab)}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                {/* Active Indicator */}
                                {tab.id === activeTabId && deletingTabId !== tab.id && (
                                  <div className={`absolute top-2 left-2 w-3 h-3 rounded-full shadow-lg animate-pulse ${
                                    isPrivateMode ? 'bg-gray-400' : 'bg-blue-500'
                                  }`}></div>
                                )}

                                {/* Deleting Indicator */}
                                {deletingTabId === tab.id && (
                                  <div className="absolute top-2 left-2 w-3 h-3 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
                                )}
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add New Tab Card */}
                  <div className="animate-fadeInUp" style={{ animationDelay: `${tabs.length * 100}ms` }}>
                    <button
                      onClick={handleNewTab}
                      className={`w-full h-full min-h-[120px] p-4 rounded-xl border-2 border-dashed transition-all duration-300 transform hover:scale-[1.02] group ${
                        isPrivateMode 
                          ? 'border-purple-600 hover:border-purple-500 bg-gray-800/30 hover:bg-purple-900/20' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center space-y-3 h-full">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isPrivateMode 
                            ? 'bg-purple-800/30 group-hover:bg-purple-700/50' 
                            : 'bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50'
                        }`}>
                          <Plus className={`w-4 h-4 ${
                            isPrivateMode ? 'text-purple-400' : 'text-blue-600 dark:text-blue-400'
                          }`} />
                        </div>
                        <div className="text-center">
                          <p className={`font-medium text-sm ${
                            isPrivateMode ? 'text-purple-200' : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            New {isPrivateMode ? 'Private ' : ''}Tab
                          </p>
                          <p className={`text-xs ${
                            isPrivateMode ? 'text-purple-400' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            Create a new {isPrivateMode ? 'private ' : ''}tab
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};