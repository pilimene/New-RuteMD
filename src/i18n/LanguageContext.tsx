import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ro, TranslationKeys } from './translations/ro';
import { ru } from './translations/ru';

type Language = 'ro' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const translations: Record<Language, TranslationKeys> = {
  ro,
  ru,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'rutemd-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Start with Romanian as default; App.tsx will set the correct language from URL
  const [language, setLanguageState] = useState<Language>('ro');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  };

  // Update document lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Helper hook to get just translations
export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}
