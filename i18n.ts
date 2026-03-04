// i18n.ts
export const locales = [
  'es',
  'en', 
  'pt',
  'fr',
  'de',
  'it',
  'nl',
  'pl',
  'tr',
  'ja',
  'ko',
  'ru',
  'hi',
  'id',
  'sv',
  'no'
] as const

export const defaultLocale = 'es' as const

export type Locale = typeof locales[number]
