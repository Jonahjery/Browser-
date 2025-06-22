import React, { useEffect } from 'react';
import { NavigationControls } from './components/NavigationControls';
import { AddressBar } from './components/AddressBar';
import { WebView } from './components/WebView';
import { WelcomeSlides } from './components/WelcomeSlides';
import { useBrowserStore } from './stores/browserStore';

function App() {
  const { theme, isPrivateMode, hasCompletedWelcome, setWelcomeCompleted } = useBrowserStore();

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System theme
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applySystemTheme = () => {
        if (mediaQuery.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      };
      
      applySystemTheme();
      
      const handleChange = (e: MediaQueryListEvent) => {
        applySystemTheme();
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Show welcome slides for first-time users
  if (!hasCompletedWelcome) {
    return <WelcomeSlides onComplete={setWelcomeCompleted} />;
  }

  return (
    <div className={`h-screen flex flex-col text-gray-900 dark:text-white relative transition-all duration-300 ${
      isPrivateMode 
        ? 'bg-gray-900' 
        : 'bg-white dark:bg-gray-900'
    }`}>
      {/* Private Mode Global Indicator */}
      {isPrivateMode && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 z-50 animate-pulse"></div>
      )}

      {/* Address Bar */}
      <AddressBar />

      {/* Web Content */}
      <div className="flex-1 pb-16 overflow-hidden">
        <WebView />
      </div>
      
      {/* Navigation Controls Fixed at Bottom */}
      <NavigationControls />
    </div>
  );
}

export default App;