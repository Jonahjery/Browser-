import React, { useState } from 'react';
import { Search, Edit3, Plus, X, Check, Trash2, Globe, AlertCircle, UserX, Shield, Eye, Lock } from 'lucide-react';
import { useBrowserStore } from '../stores/browserStore';

export const NewTabPage: React.FC = () => {
  const { navigateTab, activeTabId, createTab, isPrivateMode, togglePrivateMode, quickLinks, addQuickLink, removeQuickLink, updateQuickLink } = useBrowserStore();
  const [searchValue, setSearchValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLink, setNewLink] = useState({ title: '', url: '', icon: '', color: 'bg-blue-500' });
  const [editLink, setEditLink] = useState({ title: '', url: '', icon: '', color: 'bg-blue-500' });

  const MAX_QUICK_LINKS = 20;
  const isAtLimit = quickLinks.length >= MAX_QUICK_LINKS;

  const colorOptions = isPrivateMode 
    ? ['bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-indigo-500', 'bg-indigo-600', 'bg-violet-500', 'bg-violet-600', 'bg-pink-500', 'bg-pink-600', 'bg-gray-700', 'bg-gray-800', 'bg-slate-600']
    : ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500', 'bg-teal-500', 'bg-gray-600', 'bg-black', 'bg-blue-700'];

  const handleQuickLink = (url: string) => {
    if (activeTabId && !isEditing) {
      navigateTab(activeTabId, url);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTabId || !searchValue.trim()) return;

    let url = searchValue.trim();
    
    if (!url.includes('.') || url.includes(' ')) {
      url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    navigateTab(activeTabId, url);
  };

  const handlePrivateModeToggle = () => {
    togglePrivateMode();
    // Create a new tab in the new mode
    createTab('atom://newtab', !isPrivateMode);
  };

  const handleAddLink = () => {
    if (isAtLimit) return;
    
    if (newLink.title && newLink.url) {
      let url = newLink.url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
      
      addQuickLink({
        title: newLink.title,
        url: url,
        icon: newLink.icon || newLink.title.charAt(0).toUpperCase(),
        color: newLink.color
      });
      
      setNewLink({ title: '', url: '', icon: '', color: isPrivateMode ? 'bg-purple-500' : 'bg-blue-500' });
      setShowAddForm(false);
    }
  };

  const handleEditLink = (link: any) => {
    setEditingId(link.id);
    setEditLink({
      title: link.title,
      url: link.url,
      icon: link.icon,
      color: link.color
    });
  };

  const handleSaveEdit = () => {
    if (editingId && editLink.title && editLink.url) {
      let url = editLink.url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
      
      updateQuickLink(editingId, {
        title: editLink.title,
        url: url,
        icon: editLink.icon || editLink.title.charAt(0).toUpperCase(),
        color: editLink.color
      });
      
      setEditingId(null);
      setEditLink({ title: '', url: '', icon: '', color: isPrivateMode ? 'bg-purple-500' : 'bg-blue-500' });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditLink({ title: '', url: '', icon: '', color: isPrivateMode ? 'bg-purple-500' : 'bg-blue-500' });
  };

  const handleRemoveLink = (id: string) => {
    removeQuickLink(id);
  };

  const handleShowAddForm = () => {
    if (isAtLimit) return;
    setShowAddForm(true);
  };

  // Private Mode Design - Chrome-like minimal design (NO VISUAL INDICATORS)
  if (isPrivateMode) {
    return (
      <div className="h-full bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden relative">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,255,0.1),transparent_50%)]"></div>
        </div>

        {/* Chrome-like Private Browsing Content - Minimal Design */}
        <div className="h-full flex flex-col justify-center p-6 pb-24 pt-16 relative z-10">
          <div className="max-w-4xl w-full text-center mx-auto">
            {/* Private Browsing Title - Smaller and properly positioned */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-3">You've gone private</h1>
              <p className="text-purple-200 text-base leading-relaxed max-w-xl mx-auto">
                Your browsing activity won't be saved to this device. Downloads and bookmarks will be saved.
              </p>
            </div>

            {/* Private Search Bar - Chrome Style */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-purple-300" />
                </div>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search the web"
                  className="w-full pl-14 pr-5 py-4 bg-gray-800/60 backdrop-blur-sm rounded-full shadow-2xl border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-300 transition-all duration-200 text-base"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-violet-500/10 pointer-events-none"></div>
              </div>
            </form>

            {/* Private Browsing Features - Compact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-3 border border-purple-500/20">
                <div className="w-6 h-6 bg-purple-600/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Eye className="w-3 h-3 text-purple-300" />
                </div>
                <h3 className="text-white font-semibold text-xs mb-1">Private to you</h3>
                <p className="text-purple-200 text-xs leading-relaxed">Other people who use this device won't see your activity</p>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-3 border border-purple-500/20">
                <div className="w-6 h-6 bg-purple-600/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-3 h-3 text-purple-300" />
                </div>
                <h3 className="text-white font-semibold text-xs mb-1">Cleared when you're done</h3>
                <p className="text-purple-200 text-xs leading-relaxed">Atom clears your browsing data when you close all private tabs</p>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-3 border border-purple-500/20">
                <div className="w-6 h-6 bg-purple-600/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Globe className="w-3 h-3 text-purple-300" />
                </div>
                <h3 className="text-white font-semibold text-xs mb-1">Not fully private</h3>
                <p className="text-purple-200 text-xs leading-relaxed">Websites, your employer, or internet provider can still see your activity</p>
              </div>
            </div>

            {/* Hidden Exit Private Mode Button - Only accessible via menu */}
            <button
              onClick={handlePrivateModeToggle}
              className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300 p-2 text-purple-400 hover:text-purple-200"
              title="Exit Private Mode"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normal Mode Design (existing code)
  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto relative">
      {/* Normal Mode Toggle Button - Enhanced with Purple Blinking Animation */}
      <div className="absolute top-16 right-6 z-10">
        <button
          onClick={handlePrivateModeToggle}
          className="group relative w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 transform bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500"
          title="Enter Private Mode"
        >
          <div className="transition-all duration-300 group-hover:scale-110">
            <Shield className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
          </div>
          
          {/* Enhanced Purple Blinking Animation Overlay */}
          <div className="absolute inset-0 rounded-full bg-purple-500/0 group-hover:bg-purple-500/10 transition-all duration-300"></div>
          
          {/* NEW: Purple Blinking Ring Animation */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/60 animate-pulse opacity-70"></div>
          <div className="absolute inset-0 rounded-full border-2 border-purple-400/40 animate-ping"></div>
          
          {/* NEW: Purple Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-pulse shadow-lg shadow-purple-500/30"></div>
          
          {/* NEW: Attention-grabbing Purple Dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full animate-pulse shadow-lg">
            <div className="w-full h-full bg-purple-400 rounded-full animate-ping"></div>
          </div>
          
          {/* NEW: Rotating Purple Gradient Border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 via-transparent to-purple-500/30 animate-spin opacity-50"></div>
        </button>
      </div>

      <div className="min-h-full p-6 pb-24">
        <div className="max-w-md mx-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8 mt-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search or enter URL"
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-200"
              />
            </div>
          </form>

          {/* Quick Access Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Quick access
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({quickLinks.length}/{MAX_QUICK_LINKS})
                </span>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isEditing 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={isEditing ? 'Done editing' : 'Edit quick access'}
              >
                {isEditing ? <Check className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
              </button>
            </div>

            {/* Limit Warning */}
            {isAtLimit && (
              <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center space-x-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  You've reached the maximum of {MAX_QUICK_LINKS} quick access links. Remove some to add new ones.
                </p>
              </div>
            )}
            
            {/* Quick Links Grid */}
            <div className="grid grid-cols-4 gap-4">
              {quickLinks.map((link, index) => (
                <div key={link.id} className="relative group">
                  {editingId === link.id ? (
                    /* Edit Form */
                    <div className="col-span-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 animate-fadeIn">
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Title"
                          value={editLink.title}
                          onChange={(e) => setEditLink({ ...editLink, title: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="URL"
                          value={editLink.url}
                          onChange={(e) => setEditLink({ ...editLink, url: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Icon (emoji or letter)"
                          value={editLink.icon}
                          onChange={(e) => setEditLink({ ...editLink, icon: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex flex-wrap gap-2">
                          {colorOptions.map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => setEditLink({ ...editLink, color })}
                              className={`w-6 h-6 ${color} rounded-full border-2 ${
                                editLink.color === color ? 'border-gray-900 dark:border-white' : 'border-transparent'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Normal Link Display */
                    <button
                      onClick={() => isEditing ? handleEditLink(link) : handleQuickLink(link.url)}
                      className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 w-full relative"
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className={`w-12 h-12 ${link.color} rounded-2xl flex items-center justify-center mb-2 text-white font-bold text-lg`}>
                        {link.icon}
                      </div>
                      <span className="text-xs text-gray-700 dark:text-gray-300 text-center leading-tight">
                        {link.title}
                      </span>
                      
                      {/* Edit/Delete buttons */}
                      {isEditing && (
                        <div className="absolute -top-2 -right-2 flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveLink(link.id);
                            }}
                            className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </button>
                  )}
                </div>
              ))}

              {/* Add Button */}
              {showAddForm ? (
                <div className="col-span-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 animate-fadeIn">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Title"
                      value={newLink.title}
                      onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={newLink.url}
                      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Icon (emoji or letter)"
                      value={newLink.icon}
                      onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setNewLink({ ...newLink, color })}
                          className={`w-6 h-6 ${color} rounded-full border-2 ${
                            newLink.color === color ? 'border-gray-900 dark:border-white' : 'border-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddLink}
                        disabled={isAtLimit}
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowAddForm(false);
                          setNewLink({ title: '', url: '', icon: '', color: 'bg-blue-500' });
                        }}
                        className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={handleShowAddForm}
                  disabled={isAtLimit}
                  className={`w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center mx-auto ${
                    isAtLimit 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:shadow-md hover:scale-105'
                  }`}
                  title={isAtLimit ? `Maximum ${MAX_QUICK_LINKS} links reached` : 'Add new quick access'}
                >
                  <Plus className={`w-6 h-6 ${isAtLimit ? 'text-gray-300' : 'text-gray-400'}`} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};