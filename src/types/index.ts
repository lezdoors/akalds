// Language and Internationalization Types
export type Language = 'en' | 'fr';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // Returns string for string values, raw value (e.g. string[] or object)
  // for non-string locale entries, and the key as fallback when missing.
  t: <T = string>(key: string, params?: Record<string, string | number>) => T;
  getLocalizedPath: (path: string) => string;
  isLoading: boolean;
}
