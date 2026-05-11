import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, LanguageContextType } from '@/types';

// Translation files
const translations = {
  en: () => import('@/locales/en').then(m => m.default),
  fr: () => import('@/locales/fr').then(m => m.default),
};

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ 
  children, 
  defaultLanguage = 'en' 
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [translationData, setTranslationData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translation data with error handling
  const loadTranslations = async (lang: Language) => {
    try {
      const data = await translations[lang]();
      setTranslationData(data);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      // Fallback to English if loading fails
      if (lang !== 'en') {
        try {
          const fallbackData = await translations.en();
          setTranslationData(fallbackData);
        } catch (fallbackError) {
          console.error('Failed to load fallback translations:', fallbackError);
          // Set empty object to prevent errors
          setTranslationData({});
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize with default language
  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  // Translation function with parameter support
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value = translationData;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Suppress warning while translations are still loading async —
        // the lookup will succeed on next render once data lands.
        if (!isLoading) {
          console.warn(`Translation key not found: ${key}`);
        }
        return key; // Return key as fallback
      }
    }

    let result = typeof value === 'string' ? value : key;

    // Replace parameters in the translation
    if (params) {
      Object.entries(params).forEach(([param, val]) => {
        result = result.replace(new RegExp(`{{${param}}}`, 'g'), String(val));
      });
    }

    return result;
  };

  // Generate localized path
  const getLocalizedPath = (path: string): string => {
    // Remove leading slash for consistency
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    if (language === 'en') {
      return `/en/${cleanPath}`;
    }
    return `/${cleanPath}`;
  };

  // Set language (URL updates will be handled by components)
  const setLanguage = (newLanguage: Language) => {
    if (newLanguage === language) return;
    setLanguageState(newLanguage);
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    getLocalizedPath,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// Remove the LanguageUrlHandler component for now
// We'll handle URL detection in individual components that need it

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook for easy translation access
export function useTranslation() {
  const { t, language, isLoading } = useLanguage();
  return { t, language, isLoading };
}

// Hook for localized navigation (will be used in components that have Router context)
export function useLocalizedNavigate() {
  const { getLocalizedPath } = useLanguage();
  
  // Return a function that components can call with navigate hook
  const getLocalizedNavigateFunction = (navigate: any) => {
    return (path: string, options?: { replace?: boolean; state?: any }) => {
      const localizedPath = getLocalizedPath(path);
      navigate(localizedPath, options);
    };
  };

  return { getLocalizedPath, getLocalizedNavigateFunction };
}