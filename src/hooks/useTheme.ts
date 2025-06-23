import { useBrowserStore } from '../stores/browserStore';
import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const { theme, isPrivateMode } = useBrowserStore();
  const systemColorScheme = useColorScheme();

  const isDark = theme === 'dark' || (theme === 'system' && systemColorScheme === 'dark');

  const lightColors = {
    primary: '#3B82F6',
    accent: '#8B5CF6',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    input: '#F3F4F6',
    border: '#E5E7EB',
    text: '#111827',
    textSecondary: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    privatePrimary: '#8B5CF6',
    privateAccent: '#A855F7',
    privateBackground: '#1F2937',
    privateInput: 'rgba(55, 65, 81, 0.6)',
    privateBorder: 'rgba(139, 92, 246, 0.3)',
  };

  const darkColors = {
    primary: '#60A5FA',
    accent: '#A78BFA',
    background: '#111827',
    surface: '#1F2937',
    input: '#374151',
    border: '#4B5563',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    privatePrimary: '#A78BFA',
    privateAccent: '#C084FC',
    privateBackground: '#0F172A',
    privateInput: 'rgba(30, 41, 59, 0.8)',
    privateBorder: 'rgba(167, 139, 250, 0.3)',
  };

  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
    isPrivateMode,
  };
};