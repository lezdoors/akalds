import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  // The URL is the source of truth: /en/* is English, everything else French.
  const languageFromPath = (pathname: string): Language =>
    pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';

  const [language, setLanguageState] = useState<Language>(
    () => languageFromPath(location.pathname) ?? defaultLanguage
  );
  const [translationData, setTranslationData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Keep language in sync with the URL (direct visits, back/forward, in-app links).
  useEffect(() => {
    setLanguageState(languageFromPath(location.pathname));
  }, [location.pathname]);

  // Keep <html lang> accurate for SEO and assistive tech.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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

  // Translation function with parameter support.
  // Returns string for string values, raw value (array/object) otherwise,
  // and the key as fallback when missing.
  const t = (key: string, params?: Record<string, string | number>): any => {
    const keys = key.split('.');
    let value: any = translationData;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Suppress warning while translations are still loading async —
        // the lookup will succeed on next render once data lands.
        if (!isLoading) {
          console.warn(`Translation key not found: ${key}`);
        }
        // Return safe fallback that won't crash array/object consumers
        return Array.isArray(value) ? [] : key;
      }
    }

    // If the resolved value is not a string (array/object), return it directly.
    // Consumers that need arrays (e.g. paragraphs.map) get the array; string
    // consumers continue to receive strings as before.
    if (typeof value !== 'string') {
      return value;
    }

    let result = value;

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
      return cleanPath ? `/en/${cleanPath}` : '/en';
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