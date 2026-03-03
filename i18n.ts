export type Locale = 
  | 'es' | 'en' | 'pt' | 'fr' | 'de' | 'it' 
  | 'nl' | 'pl' | 'tr' | 'ja' | 'ko' | 'ru' 
  | 'hi' | 'id' | 'sv' | 'no';

export const locales: Locale[] = [
  'es', // Español
  'en', // English
  'pt', // Português
  'fr', // Français
  'de', // Deutsch
  'it', // Italiano
  'nl', // Nederlands
  'pl', // Polski
  'tr', // Türkçe
  'ja', // 日本語
  'ko', // 한국어
  'ru', // Русский
  'hi', // हिन्दी
  'id', // Bahasa Indonesia
  'sv', // Svenska
  'no', // Norsk
];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  nl: 'Nederlands',
  pl: 'Polski',
  tr: 'Türkçe',
  ja: '日本語',
  ko: '한국어',
  ru: 'Русский',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  sv: 'Svenska',
  no: 'Norsk',
};

export const localeFlags: Record<Locale, string> = {
  es: '🇪🇸',
  en: '🇺🇸',
  pt: '🇧🇷',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹',
  nl: '🇳🇱',
  pl: '🇵🇱',
  tr: '🇹🇷',
  ja: '🇯🇵',
  ko: '🇰🇷',
  ru: '🇷🇺',
  hi: '🇮🇳',
  id: '🇮🇩',
  sv: '🇸🇪',
  no: '🇳🇴',
};
