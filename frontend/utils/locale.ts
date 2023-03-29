export const LOCALE_NAME = {
  br: 'brazil',
  us: 'united-states',
  ar: 'arab',
  ch: 'china',
  de: 'germany',
  ja: 'japan',
  ko: 'korea',
  pt: 'portugal',
  ru: 'russia',
  es: 'spain',
} as { [key: string]: string }

export const SUPPORTED_LOCALES = Object.keys(LOCALE_NAME)
export type Locale = keyof typeof LOCALE_NAME
