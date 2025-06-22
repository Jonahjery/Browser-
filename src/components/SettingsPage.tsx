import React, { useState } from 'react';
import { ArrowLeft, User, Shield, Search, Lock, CreditCard, MapPin, Bot, Table as Tabs, Home, Square, Shirt as Shortcut, Bell, Palette, Accessibility, Globe, Languages, Download, Info, ChevronRight, Check, Eye, EyeOff, Key, Smartphone, Monitor, Sun, Moon, Volume2, Chrome, Settings, HelpCircle, FileText, Zap, Database, Wifi, Camera, Mic, MapPinIcon, Clock, Image, Video, FileImage, Printer, Bluetooth, Usb, HardDrive, Network, Cpu, MemoryStick, Battery, Power } from 'lucide-react';
import { useBrowserStore } from '../stores/browserStore';

interface SettingsPageProps {
  onBack: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const { theme, setTheme, isPrivateMode } = useBrowserStore();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchEngine, setSearchEngine] = useState('Google');
  const [homepageUrl, setHomepageUrl] = useState('atom://newtab');
  const [showPasswords, setShowPasswords] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoFill, setAutoFill] = useState(true);
  const [safetyCheck, setSafetyCheck] = useState(true);
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);
  const [cameraAccess, setCameraAccess] = useState(false);
  const [microphoneAccess, setMicrophoneAccess] = useState(false);
  const [cookiesEnabled, setCookiesEnabled] = useState(true);
  const [javascriptEnabled, setJavascriptEnabled] = useState(true);
  const [popupsBlocked, setPopupsBlocked] = useState(true);
  const [adsBlocked, setAdsBlocked] = useState(false);
  const [downloadLocation, setDownloadLocation] = useState('/Downloads');
  const [autoDownload, setAutoDownload] = useState(false);
  const [language, setLanguage] = useState('English (United States)');
  const [spellCheck, setSpellCheck] = useState(true);
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    largeText: false,
    screenReader: false,
    reducedMotion: false
  });

  const searchEngines = ['Google', 'Bing', 'DuckDuckGo', 'Yahoo', 'Yandex', 'Baidu'];
  const languages = [
    'English (United States)',
    'English (United Kingdom)', 
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Russian',
    'Chinese (Simplified)',
    'Japanese',
    'Korean',
    'Arabic'
  ];
  
  const themes = [
    { id: 'system', name: 'System default', icon: Monitor },
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon }
  ];

  const settingsSections = [
    {
      title: 'You and Google',
      items: [
        {
          icon: User,
          title: 'Nonce Firewall',
          subtitle: 'noncefirewall@gmail.com',
          onClick: () => setActiveSection('profile')
        }
      ]
    },
    {
      title: 'Google services',
      items: [
        {
          icon: Chrome,
          title: 'Google services',
          onClick: () => setActiveSection('google-services')
        }
      ]
    },
    {
      title: 'Basics',
      items: [
        {
          icon: Search,
          title: 'Search engine',
          subtitle: searchEngine,
          onClick: () => setActiveSection('search-engine')
        },
        {
          icon: Shield,
          title: 'Privacy and security',
          onClick: () => setActiveSection('privacy-security')
        },
        {
          icon: Shield,
          title: 'Safety check',
          onClick: () => setActiveSection('safety-check')
        }
      ]
    },
    {
      title: 'Passwords and Autofill',
      items: [
        {
          icon: Key,
          title: 'Google Password Manager',
          onClick: () => setActiveSection('password-manager')
        },
        {
          icon: CreditCard,
          title: 'Payment methods',
          onClick: () => setActiveSection('payment-methods')
        },
        {
          icon: MapPin,
          title: 'Addresses and more',
          onClick: () => setActiveSection('addresses')
        },
        {
          icon: Bot,
          title: 'Autofill services',
          onClick: () => setActiveSection('autofill-services')
        }
      ]
    },
    {
      title: 'Advanced',
      items: [
        {
          icon: Tabs,
          title: 'Tabs',
          onClick: () => setActiveSection('tabs')
        },
        {
          icon: Home,
          title: 'Homepage',
          subtitle: homepageUrl === 'atom://newtab' ? 'New Tab page' : homepageUrl,
          onClick: () => setActiveSection('homepage')
        },
        {
          icon: Square,
          title: 'New tab page cards',
          onClick: () => setActiveSection('new-tab-cards')
        },
        {
          icon: Shortcut,
          title: 'Toolbar shortcut',
          onClick: () => setActiveSection('toolbar-shortcut')
        },
        {
          icon: Bell,
          title: 'Notifications',
          onClick: () => setActiveSection('notifications')
        },
        {
          icon: Palette,
          title: 'Theme',
          subtitle: theme === 'system' ? 'System default' : theme === 'light' ? 'Light' : 'Dark',
          onClick: () => setActiveSection('theme')
        },
        {
          icon: Accessibility,
          title: 'Accessibility',
          onClick: () => setActiveSection('accessibility')
        },
        {
          icon: Globe,
          title: 'Site settings',
          onClick: () => setActiveSection('site-settings')
        },
        {
          icon: Languages,
          title: 'Languages',
          subtitle: language,
          onClick: () => setActiveSection('languages')
        },
        {
          icon: Download,
          title: 'Downloads',
          subtitle: downloadLocation,
          onClick: () => setActiveSection('downloads')
        },
        {
          icon: Info,
          title: 'About Atom',
          onClick: () => setActiveSection('about')
        }
      ]
    }
  ];

  const renderToggleSwitch = (checked: boolean, onChange: (checked: boolean) => void) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );

  const renderMainSettings = () => (
    <div className="space-y-6">
      {settingsSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-3">
          <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400 px-4">
            {section.title}
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {section.items.map((item, itemIndex) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={itemIndex}
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Nonce Firewall</h4>
                  <p className="text-gray-500 dark:text-gray-400">noncefirewall@gmail.com</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Sync</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Sync your data across devices</div>
                  </div>
                  {renderToggleSwitch(syncEnabled, setSyncEnabled)}
                </div>
              </div>
            </div>
          </div>
        );

      case 'google-services':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Google services</h3>
            <div className="space-y-3">
              {[
                { name: 'Google Search', desc: 'Enhanced search features', enabled: true },
                { name: 'Google Translate', desc: 'Automatic page translation', enabled: true },
                { name: 'Google Safe Browsing', desc: 'Protection from malicious sites', enabled: true },
                { name: 'Google Analytics', desc: 'Usage analytics', enabled: false }
              ].map((service, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{service.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{service.desc}</div>
                    </div>
                    {renderToggleSwitch(service.enabled, () => {})}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'search-engine':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Search engine</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              {searchEngines.map((engine) => (
                <button
                  key={engine}
                  onClick={() => setSearchEngine(engine)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                >
                  <span className="text-gray-900 dark:text-white">{engine}</span>
                  {searchEngine === engine && (
                    <Check className="w-5 h-5 text-blue-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 'privacy-security':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy and security</h3>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Safety check</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Check for security issues</div>
                  </div>
                  {renderToggleSwitch(safetyCheck, setSafetyCheck)}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Block ads</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Block intrusive advertisements</div>
                  </div>
                  {renderToggleSwitch(adsBlocked, setAdsBlocked)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Block pop-ups</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Prevent pop-up windows</div>
                  </div>
                  {renderToggleSwitch(popupsBlocked, setPopupsBlocked)}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Private mode</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Currently {isPrivateMode ? 'enabled' : 'disabled'}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isPrivateMode 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {isPrivateMode ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'safety-check':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Safety check</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">All good!</h4>
                  <p className="text-gray-500 dark:text-gray-400">No security issues found</p>
                </div>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Run safety check
                </button>
              </div>
            </div>
          </div>
        );

      case 'password-manager':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Password Manager</h3>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-medium text-gray-900 dark:text-white">Saved passwords</div>
                  <button
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {showPasswords ? (
                      <EyeOff className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    )}
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    No saved passwords yet
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Auto-fill passwords</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Automatically fill saved passwords</div>
                  </div>
                  {renderToggleSwitch(autoFill, setAutoFill)}
                </div>
              </div>
            </div>
          </div>
        );

      case 'payment-methods':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment methods</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center space-y-4">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">No payment methods</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add a payment method to autofill checkout forms</p>
                </div>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Add payment method
                </button>
              </div>
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Addresses and more</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center space-y-4">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">No addresses saved</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Save addresses to quickly fill out forms</p>
                </div>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Add address
                </button>
              </div>
            </div>
          </div>
        );

      case 'autofill-services':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Autofill services</h3>
            <div className="space-y-3">
              {[
                { name: 'Passwords', desc: 'Auto-fill saved passwords', enabled: autoFill },
                { name: 'Payment methods', desc: 'Auto-fill payment information', enabled: true },
                { name: 'Addresses', desc: 'Auto-fill shipping and billing addresses', enabled: true },
                { name: 'Phone numbers', desc: 'Auto-fill phone numbers', enabled: true }
              ].map((service, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{service.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{service.desc}</div>
                    </div>
                    {renderToggleSwitch(service.enabled, () => {})}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tabs':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tabs</h3>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Group similar tabs</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Automatically group related tabs</div>
                  </div>
                  {renderToggleSwitch(true, () => {})}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Show tab previews</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Show preview when hovering over tabs</div>
                  </div>
                  {renderToggleSwitch(false, () => {})}
                </div>
              </div>
            </div>
          </div>
        );

      case 'homepage':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Homepage</h3>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="homepage"
                    checked={homepageUrl === 'atom://newtab'}
                    onChange={() => setHomepageUrl('atom://newtab')}
                    className="text-blue-500"
                  />
                  <span className="text-gray-900 dark:text-white">New Tab page</span>
                </label>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <label className="flex items-center space-x-3 mb-3">
                  <input
                    type="radio"
                    name="homepage"
                    checked={homepageUrl !== 'atom://newtab'}
                    onChange={() => setHomepageUrl('https://google.com')}
                    className="text-blue-500"
                  />
                  <span className="text-gray-900 dark:text-white">Custom URL</span>
                </label>
                {homepageUrl !== 'atom://newtab' && (
                  <input
                    type="url"
                    value={homepageUrl}
                    onChange={(e) => setHomepageUrl(e.target.value)}
                    placeholder="Enter URL"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>
          </div>
        );

      case 'new-tab-cards':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">New tab page cards</h3>
            <div className="space-y-3">
              {[
                { name: 'Quick access', desc: 'Show frequently visited sites', enabled: true },
                { name: 'Weather', desc: 'Show current weather', enabled: false },
                { name: 'News', desc: 'Show latest news', enabled: false },
                { name: 'Calendar', desc: 'Show upcoming events', enabled: false }
              ].map((card, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{card.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{card.desc}</div>
                    </div>
                    {renderToggleSwitch(card.enabled, () => {})}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'toolbar-shortcut':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Toolbar shortcut</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center space-y-4">
                <Shortcut className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Add to toolbar</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Create a shortcut to Atom Browser in your system toolbar</p>
                </div>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Add shortcut
                </button>
              </div>
            </div>
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Theme</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              {themes.map((themeOption) => {
                const IconComponent = themeOption.icon;
                return (
                  <button
                    key={themeOption.id}
                    onClick={() => setTheme(themeOption.id as 'light' | 'dark' | 'system')}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      <span className="text-gray-900 dark:text-white">{themeOption.name}</span>
                    </div>
                    {theme === themeOption.id && (
                      <Check className="w-5 h-5 text-blue-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'accessibility':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Accessibility</h3>
            <div className="space-y-3">
              {[
                { key: 'highContrast', name: 'High contrast', desc: 'Increase color contrast for better visibility' },
                { key: 'largeText', name: 'Large text', desc: 'Increase text size throughout the browser' },
                { key: 'screenReader', name: 'Screen reader support', desc: 'Enhanced support for screen readers' },
                { key: 'reducedMotion', name: 'Reduced motion', desc: 'Minimize animations and transitions' }
              ].map((option) => (
                <div key={option.key} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{option.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{option.desc}</div>
                    </div>
                    {renderToggleSwitch(accessibility[option.key as keyof typeof accessibility], (checked) => 
                      setAccessibility(prev => ({ ...prev, [option.key]: checked }))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'site-settings':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Site settings</h3>
            <div className="space-y-3">
              {[
                { name: 'Cookies', desc: 'Allow sites to save and read cookie data', enabled: cookiesEnabled, setter: setCookiesEnabled },
                { name: 'JavaScript', desc: 'Allow sites to run JavaScript', enabled: javascriptEnabled, setter: setJavascriptEnabled },
                { name: 'Location', desc: 'Allow sites to access your location', enabled: locationAccess, setter: setLocationAccess },
                { name: 'Camera', desc: 'Allow sites to access your camera', enabled: cameraAccess, setter: setCameraAccess },
                { name: 'Microphone', desc: 'Allow sites to access your microphone', enabled: microphoneAccess, setter: setMicrophoneAccess }
              ].map((setting, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{setting.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{setting.desc}</div>
                    </div>
                    {renderToggleSwitch(setting.enabled, setting.setter)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Languages</h3>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-medium text-gray-900 dark:text-white">Preferred language</div>
                </div>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Spell check</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Check spelling as you type</div>
                  </div>
                  {renderToggleSwitch(spellCheck, setSpellCheck)}
                </div>
              </div>
            </div>
          </div>
        );

      case 'downloads':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Downloads</h3>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="mb-4">
                  <div className="font-medium text-gray-900 dark:text-white mb-2">Download location</div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={downloadLocation}
                      onChange={(e) => setDownloadLocation(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Browse
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Ask where to save each file</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Choose location for each download</div>
                  </div>
                  {renderToggleSwitch(!autoDownload, (checked) => setAutoDownload(!checked))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Browser notifications</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Allow websites to send notifications</div>
                  </div>
                  {renderToggleSwitch(notifications, setNotifications)}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Sound</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Play sound for notifications</div>
                  </div>
                  {renderToggleSwitch(true, () => {})}
                </div>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About Atom Browser</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Atom Browser</h4>
                  <p className="text-gray-500 dark:text-gray-400">Version 1.0.0</p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <p>A modern, fast, and secure web browser built with React and TypeScript.</p>
                  <p>© 2025 Atom Browser. All rights reserved.</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button className="text-blue-500 hover:text-blue-700 text-sm">Privacy Policy</button>
                  <button className="text-blue-500 hover:text-blue-700 text-sm">Terms of Service</button>
                  <button className="text-blue-500 hover:text-blue-700 text-sm">Help Center</button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {activeSection?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center text-gray-500 dark:text-gray-400">
                This feature is coming soon!
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 z-10">
        <div className="flex items-center space-x-3">
          <button
            onClick={activeSection ? () => setActiveSection(null) : onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {activeSection ? activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ') : 'Settings'}
          </h1>
        </div>
      </div>

      <div className="p-4 pb-24">
        {activeSection ? renderSectionContent() : renderMainSettings()}
      </div>
    </div>
  );
};