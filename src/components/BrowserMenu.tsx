import React, { useState, useEffect } from 'react';
import { Menu, Bookmark, History, Shield, Moon, Sun, Monitor, ArrowLeft, Download, Globe, Plus, Share, Search, Monitor as Desktop, Type, ZoomIn, Puzzle, Printer, Settings, Trash2, Languages, Play, Smartphone, PlusSquare as SquarePlus, Table as Tabs, UserX, Copy, Link, Mail, MessageSquare, Facebook, Twitter, Linkedin, QrCode, Volume2, VolumeX, Minus, RotateCcw, Home, ExternalLink } from 'lucide-react';
import { useBrowserStore } from '../stores/browserStore';
import { SettingsPage } from './SettingsPage';
import { ModeConfirmationModal } from './ModeConfirmationModal';

export const BrowserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'main' | 'bookmarks' | 'history' | 'recentTabs' | 'settings' | 'downloads' | 'share' | 'zoom'>('main');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isListening, setIsListening] = useState(false);
  const [isDesktopSite, setIsDesktopSite] = useState(false);
  const [findText, setFindText] = useState('');
  const [showFindBar, setShowFindBar] = useState(false);
  const [showModeModal, setShowModeModal] = useState(false);
  const [pendingModeSwitch, setPendingModeSwitch] = useState<'private' | 'normal' | null>(null);
  
  const { 
    bookmarks, 
    history, 
    isPrivateMode, 
    theme, 
    togglePrivateMode, 
    setTheme, 
    navigateTab, 
    activeTabId,
    clearHistory,
    createTab,
    tabs,
    setActiveTab
  } = useBrowserStore();

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isOpen && !target.closest('.browser-menu-container')) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveSection('main');
    setShowFindBar(false);
  };

  const handleBookmarkClick = (url: string) => {
    if (activeTabId) {
      navigateTab(activeTabId, url);
      closeMenu();
    }
  };

  const handleHistoryClick = (url: string) => {
    if (activeTabId) {
      navigateTab(activeTabId, url);
      closeMenu();
    }
  };

  const handleNewTab = () => {
    createTab('atom://newtab', isPrivateMode);
    closeMenu();
  };

  const handleNewIncognitoTab = () => {
    const targetMode = isPrivateMode ? 'normal' : 'private';
    const existingTabs = tabs.filter(tab => tab.isPrivate === (targetMode === 'private'));
    
    setPendingModeSwitch(targetMode);
    setShowModeModal(true);
    closeMenu();
  };

  const handleModeConfirm = () => {
    if (!pendingModeSwitch) return;
    
    const targetMode = pendingModeSwitch;
    const existingTabs = tabs.filter(tab => tab.isPrivate === (targetMode === 'private'));
    
    if (existingTabs.length > 0) {
      // Switch to existing tab of the target mode
      const mostRecentTab = existingTabs[existingTabs.length - 1];
      setActiveTab(mostRecentTab.id);
    } else {
      // Create new tab in target mode
      createTab('atom://newtab', targetMode === 'private');
    }
    
    setShowModeModal(false);
    setPendingModeSwitch(null);
  };

  const handleModeCancel = () => {
    setShowModeModal(false);
    setPendingModeSwitch(null);
  };

  const handleDownloads = () => {
    setActiveSection('downloads');
  };

  const handleZoom = () => {
    setActiveSection('zoom');
  };

  const handleShare = () => {
    setActiveSection('share');
  };

  const handleFindInPage = () => {
    setShowFindBar(true);
    closeMenu();
  };

  const handleTranslate = () => {
    if (activeTab && activeTab.url !== 'atom://newtab') {
      // Simulate translation
      alert('Page translation feature activated! In a real browser, this would translate the current page.');
    }
    closeMenu();
  };

  const handleListenToPage = () => {
    setIsListening(!isListening);
    if (!isListening) {
      alert('Text-to-speech started! In a real browser, this would read the page content aloud.');
    } else {
      alert('Text-to-speech stopped.');
    }
    closeMenu();
  };

  const handleAddToHomeScreen = () => {
    if (activeTab && activeTab.url !== 'atom://newtab') {
      alert(`"${activeTab.title}" has been added to your home screen!`);
    }
    closeMenu();
  };

  const handleDesktopSite = () => {
    setIsDesktopSite(!isDesktopSite);
    if (activeTab && activeTab.url !== 'atom://newtab') {
      alert(`${isDesktopSite ? 'Mobile' : 'Desktop'} site mode activated!`);
    }
    closeMenu();
  };

  const handleZoomChange = (newZoom: number) => {
    setZoomLevel(newZoom);
    document.body.style.zoom = `${newZoom}%`;
  };

  const handleShareOption = (platform: string) => {
    if (!activeTab || activeTab.url === 'atom://newtab') return;
    
    const url = encodeURIComponent(activeTab.url);
    const title = encodeURIComponent(activeTab.title);
    
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(activeTab.url);
        alert('Link copied to clipboard!');
        break;
      case 'email':
        window.open(`mailto:?subject=${title}&body=${url}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
        break;
      case 'qr':
        alert('QR code generated! In a real browser, this would show a QR code for the current page.');
        break;
    }
    closeMenu();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const menuItems = [
    {
      icon: Plus,
      label: 'New tab',
      onClick: handleNewTab,
      section: 'main'
    },
    {
      icon: UserX,
      label: isPrivateMode ? 'New normal tab' : 'New Incognito tab',
      onClick: handleNewIncognitoTab,
      section: 'main'
    },
    {
      icon: History,
      label: 'History',
      onClick: () => setActiveSection('history'),
      section: 'main'
    },
    {
      icon: Trash2,
      label: 'Delete browsing data',
      onClick: () => {
        clearHistory();
        alert('Browsing data cleared!');
        closeMenu();
      },
      section: 'main'
    },
    {
      icon: Download,
      label: 'Downloads',
      onClick: handleDownloads,
      section: 'main'
    },
    {
      icon: Bookmark,
      label: 'Bookmarks',
      onClick: () => setActiveSection('bookmarks'),
      section: 'main'
    },
    {
      icon: Tabs,
      label: 'Recent tabs',
      onClick: () => setActiveSection('recentTabs'),
      section: 'main'
    },
    {
      icon: ZoomIn,
      label: 'Zoom',
      onClick: handleZoom,
      section: 'main'
    },
    {
      icon: Share,
      label: 'Share...',
      onClick: handleShare,
      section: 'main'
    },
    {
      icon: Search,
      label: 'Find in page',
      onClick: handleFindInPage,
      section: 'main'
    },
    {
      icon: Languages,
      label: 'Translate...',
      onClick: handleTranslate,
      section: 'main'
    },
    {
      icon: isListening ? VolumeX : Play,
      label: isListening ? 'Stop listening' : 'Listen to this page',
      onClick: handleListenToPage,
      section: 'main'
    },
    {
      icon: SquarePlus,
      label: 'Add to Home screen',
      onClick: handleAddToHomeScreen,
      section: 'main'
    },
    {
      icon: Desktop,
      label: isDesktopSite ? 'Mobile site' : 'Desktop site',
      onClick: handleDesktopSite,
      section: 'main',
      active: isDesktopSite
    }
  ];

  const renderMainMenu = () => (
    <div className="grid grid-cols-4 gap-3">
      {menuItems.filter(item => item.section === 'main').map((item, index) => {
        const IconComponent = item.icon;
        return (
          <button
            key={index}
            onClick={item.onClick}
            className={`
              flex flex-col items-center p-3 rounded-xl transition-all duration-200 transform hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700
              ${item.active ? 'bg-blue-100 dark:bg-blue-900' : ''}
            `}
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
              item.active ? 'bg-blue-200 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'
            }`}>
              <IconComponent className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </div>
            <span className="text-xs text-gray-700 dark:text-gray-300 text-center leading-tight">
              {item.label}
            </span>
          </button>
        );
      })}
      
      {/* Theme Toggle */}
      <button
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
          closeMenu();
        }}
        className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
      >
        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          ) : (
            <Moon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          )}
        </div>
        <span className="text-xs text-gray-700 dark:text-gray-300 text-center leading-tight">
          {theme === 'dark' ? 'Light theme' : 'Dark theme'}
        </span>
      </button>

      {/* Privacy Mode Toggle */}
      <button
        onClick={() => {
          const targetMode = isPrivateMode ? 'normal' : 'private';
          const existingTabs = tabs.filter(tab => tab.isPrivate === (targetMode === 'private'));
          
          setPendingModeSwitch(targetMode);
          setShowModeModal(true);
          closeMenu();
        }}
        className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${
          isPrivateMode ? 'bg-purple-100 dark:bg-purple-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
          isPrivateMode ? 'bg-purple-200 dark:bg-purple-800' : 'bg-gray-100 dark:bg-gray-700'
        }`}>
          <Shield className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </div>
        <span className="text-xs text-gray-700 dark:text-gray-300 text-center leading-tight">
          {isPrivateMode ? 'Exit private' : 'Privacy mode'}
        </span>
        {isPrivateMode && (
          <div className="w-2 h-2 bg-purple-500 rounded-full mt-1"></div>
        )}
      </button>

      {/* Settings */}
      <button
        onClick={() => setActiveSection('settings')}
        className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
      >
        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
          <Settings className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </div>
        <span className="text-xs text-gray-700 dark:text-gray-300 text-center leading-tight">
          Settings
        </span>
      </button>
    </div>
  );

  const renderDownloads = () => (
    <div className="animate-slideInRight">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setActiveSection('main')}
          className="flex items-center text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Downloads</h3>
        <div></div>
      </div>
      
      <div className="space-y-3">
        <div className="text-center py-8">
          <Download className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">No downloads yet</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">Downloaded files will appear here</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Download location</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">/Downloads</div>
            </div>
            <button className="text-blue-500 hover:text-blue-700 text-sm">Change</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderZoom = () => (
    <div className="animate-slideInRight">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setActiveSection('main')}
          className="flex items-center text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Zoom</h3>
        <div></div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{zoomLevel}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Current zoom level</div>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button
              onClick={() => handleZoomChange(Math.max(25, zoomLevel - 25))}
              className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => handleZoomChange(100)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Reset
            </button>
            
            <button
              onClick={() => handleZoomChange(Math.min(500, zoomLevel + 25))}
              className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {[50, 75, 100, 125, 150, 200].map((zoom) => (
              <button
                key={zoom}
                onClick={() => handleZoomChange(zoom)}
                className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                  zoomLevel === zoom
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {zoom}%
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderShare = () => (
    <div className="animate-slideInRight">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setActiveSection('main')}
          className="flex items-center text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Share</h3>
        <div></div>
      </div>
      
      {activeTab && activeTab.url !== 'atom://newtab' ? (
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
            <div className="font-medium text-gray-900 dark:text-white mb-1">{activeTab.title}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 break-all">{activeTab.url}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Copy, label: 'Copy link', action: 'copy' },
              { icon: Mail, label: 'Email', action: 'email' },
              { icon: Facebook, label: 'Facebook', action: 'facebook' },
              { icon: Twitter, label: 'Twitter', action: 'twitter' },
              { icon: Linkedin, label: 'LinkedIn', action: 'linkedin' },
              { icon: QrCode, label: 'QR Code', action: 'qr' }
            ].map((option, index) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.action}
                  onClick={() => handleShareOption(option.action)}
                  className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-[1.02]"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Share className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Nothing to share</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">Navigate to a webpage to share it</p>
        </div>
      )}
    </div>
  );

  const renderBookmarks = () => (
    <div className="animate-slideInRight">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setActiveSection('main')}
          className="flex items-center text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Bookmarks</h3>
        <div></div>
      </div>
      
      <div className="max-h-64 overflow-y-auto space-y-1">
        {bookmarks.map((bookmark, index) => (
          <button
            key={bookmark.id}
            onClick={() => handleBookmarkClick(bookmark.url)}
            className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm transition-all duration-200 transform hover:scale-[1.02] animate-fadeInUp"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="font-medium truncate">{bookmark.title}</div>
            <div className="text-xs text-gray-500 truncate">{bookmark.url}</div>
            <div className="text-xs text-gray-400 mt-1">
              Added {formatDate(bookmark.createdAt)}
            </div>
          </button>
        ))}
        {bookmarks.length === 0 && (
          <div className="text-sm text-gray-500 p-4 text-center animate-fadeIn">No bookmarks yet</div>
        )}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="animate-slideInRight">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setActiveSection('main')}
          className="flex items-center text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">History</h3>
        {history.length > 0 && (
          <button
            onClick={() => {
              clearHistory();
              closeMenu();
            }}
            className="text-xs text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            Clear
          </button>
        )}
      </div>
      
      <div className="max-h-64 overflow-y-auto space-y-1">
        {history.slice(0, 20).map((entry, index) => (
          <button
            key={entry.id}
            onClick={() => handleHistoryClick(entry.url)}
            className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm transition-all duration-200 transform hover:scale-[1.02] animate-fadeInUp"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="font-medium truncate">{entry.title}</div>
            <div className="text-xs text-gray-500 truncate">{entry.url}</div>
            <div className="text-xs text-gray-400 mt-1">
              Visited {formatDate(entry.visitedAt)}
            </div>
          </button>
        ))}
        {history.length === 0 && (
          <div className="text-sm text-gray-500 p-4 text-center animate-fadeIn">No history yet</div>
        )}
      </div>
    </div>
  );

  const renderRecentTabs = () => (
    <div className="animate-slideInRight">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setActiveSection('main')}
          className="flex items-center text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Recent tabs</h3>
        <div></div>
      </div>
      
      <div className="max-h-64 overflow-y-auto space-y-1">
        {tabs.filter(tab => tab.url !== 'atom://newtab').slice(0, 10).map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => {
              if (activeTabId) {
                navigateTab(activeTabId, tab.url);
                closeMenu();
              }
            }}
            className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm transition-all duration-200 transform hover:scale-[1.02] animate-fadeInUp"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="flex items-center space-x-2">
              {tab.isPrivate && (
                <UserX className="w-3 h-3 text-purple-500" />
              )}
              <div className="flex-1">
                <div className="font-medium truncate">{tab.title}</div>
                <div className="text-xs text-gray-500 truncate">{tab.url}</div>
              </div>
            </div>
          </button>
        ))}
        {tabs.filter(tab => tab.url !== 'atom://newtab').length === 0 && (
          <div className="text-sm text-gray-500 p-4 text-center animate-fadeIn">No recent tabs</div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="relative browser-menu-container">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setActiveSection('main');
          }}
          className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-110"
          title="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {isOpen && (
          <>
            {/* Backdrop with fade animation */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fadeIn" 
              onClick={closeMenu}
            />
            
            {/* Modal with slide up animation */}
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4 animate-slideUp browser-menu-container">
              <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-all duration-300 max-h-96 overflow-hidden">
                {activeSection === 'settings' ? (
                  <div className="h-96">
                    <SettingsPage onBack={() => setActiveSection('main')} />
                  </div>
                ) : (
                  <div className="p-6 overflow-y-auto max-h-96">
                    {activeSection === 'main' && (
                      <div className="animate-fadeIn">
                        {renderMainMenu()}
                      </div>
                    )}
                    {activeSection === 'bookmarks' && renderBookmarks()}
                    {activeSection === 'history' && renderHistory()}
                    {activeSection === 'recentTabs' && renderRecentTabs()}
                    {activeSection === 'downloads' && renderDownloads()}
                    {activeSection === 'zoom' && renderZoom()}
                    {activeSection === 'share' && renderShare()}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Find in Page Bar */}
      {showFindBar && (
        <div className="fixed top-16 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 animate-slideInRight">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              placeholder="Find in page"
              className="bg-transparent text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
              autoFocus
            />
            <button
              onClick={() => setShowFindBar(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mode Confirmation Modal - Render at root level */}
      {showModeModal && (
        <ModeConfirmationModal
          isOpen={showModeModal}
          onClose={handleModeCancel}
          onConfirm={handleModeConfirm}
          currentMode={isPrivateMode ? 'private' : 'normal'}
          targetMode={pendingModeSwitch || 'normal'}
          hasExistingTabs={pendingModeSwitch ? tabs.filter(tab => tab.isPrivate === (pendingModeSwitch === 'private')).length > 0 : false}
        />
      )}
    </>
  );
};