import { LucideIcon } from 'lucide-react';

// Language and Internationalization Types
export type Language = 'en' | 'fr';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  getLocalizedPath: (path: string) => string;
  isLoading: boolean;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

// Contact Form Types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  website?: string;
  budget: 'under-10k' | '10k-25k' | '25k-50k' | '50k-100k' | '100k-250k' | '250k+';
  timeline: 'asap' | '1-month' | '1-3months' | '3-6months' | '6months+';
  services: string[];
  message: string;
  newsletter: boolean;
  gdprConsent: boolean;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PageProps extends BaseComponentProps {
  title?: string;
  description?: string;
}

// Route Types
export interface RouteParams {
  slug?: string;
  id?: string;
  category?: string;
}

export interface LocationState {
  from?: string;
  scrollTo?: string;
}