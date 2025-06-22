import React from 'react';
import { Shield, Globe, X, ArrowRight } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModeConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentMode: 'private' | 'normal';
  targetMode: 'private' | 'normal';
  hasExistingTabs: boolean;
}

export const ModeConfirmationModal: React.FC<ModeConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentMode,
  targetMode,
  hasExistingTabs
}) => {
  if (!isOpen) return null;

  const isGoingPrivate = targetMode === 'private';
  const actionText = hasExistingTabs 
    ? `Switch to existing ${targetMode} tabs`
    : `Create new ${targetMode} tab`;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md animate-slideUp">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${
            isGoingPrivate 
              ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20' 
              : 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isGoingPrivate 
                    ? 'bg-purple-100 dark:bg-purple-900/50' 
                    : 'bg-blue-100 dark:bg-blue-900/50'
                }`}>
                  {isGoingPrivate ? (
                    <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Switch to {isGoingPrivate ? 'Private' : 'Normal'} Mode
                  </h3>
                  <p className={`text-sm ${
                    isGoingPrivate 
                      ? 'text-purple-600 dark:text-purple-400' 
                      : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    {isGoingPrivate ? 'Secure browsing' : 'Standard browsing'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Action Description */}
              <div className={`p-4 rounded-xl border-2 border-dashed ${
                isGoingPrivate 
                  ? 'border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/10' 
                  : 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isGoingPrivate 
                      ? 'bg-purple-100 dark:bg-purple-900/50' 
                      : 'bg-blue-100 dark:bg-blue-900/50'
                  }`}>
                    <ArrowRight className={`w-4 h-4 ${
                      isGoingPrivate 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : 'text-blue-600 dark:text-blue-400'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {actionText}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {hasExistingTabs 
                        ? `You'll be taken to your existing ${targetMode} browsing session`
                        : `A new ${targetMode} tab will be created for you`
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Mode Features */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {isGoingPrivate ? 'Private Mode Features:' : 'Normal Mode Features:'}
                </h4>
                <div className="space-y-2">
                  {isGoingPrivate ? [
                    'Browsing history won\'t be saved',
                    'Cookies deleted when you close private tabs',
                    'Enhanced privacy protection',
                    'No tracking across sessions'
                  ] : [
                    'Full browsing history saved',
                    'Bookmarks and passwords saved',
                    'Sync across devices',
                    'Extensions and themes available'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        isGoingPrivate ? 'bg-purple-500' : 'bg-blue-500'
                      }`}></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 pt-0">
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 px-4 py-3 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl ${
                  isGoingPrivate 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                }`}
              >
                {hasExistingTabs ? 'Switch Now' : 'Create & Switch'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use createPortal to render the modal at the document body level
  return createPortal(modalContent, document.body);
};