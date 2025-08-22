'use client';
import { useParams } from 'next/navigation';
import en from '@/i18n/en.json';
import de from '@/i18n/de.json';

type TranslationKey = string;
type Translations = typeof en;

const translations: Record<string, Translations> = {
  en,
  de,
};

// Helper function to get nested object value by dot notation
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

// Helper function to replace placeholders in translation strings
function replacePlaceholders(text: string, params: Record<string, string | number> = {}): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key]?.toString() || match;
  });
}

// Hook for client components
export function useTranslation() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const translation = getNestedValue(translations[locale] || translations.en, key);
    return replacePlaceholders(translation, params);
  };

  return { t, locale };
}

// Export translations for direct access if needed
export { translations };
