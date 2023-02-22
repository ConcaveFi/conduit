export async function getLanguageByLocale(locale?: string) {
  if (!locale) locale = 'us'
  return import(`../translations/${locale}.json`)
}
