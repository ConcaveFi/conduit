export const STORE_LOCALE_ITEM = 'locale'
export function getStoredLocale() {
  const locale = localStorage.getItem(STORE_LOCALE_ITEM)
  return locale || ''
}

export function storeLocale(locale?: string): boolean {
  if (!locale) return false
  localStorage.setItem(STORE_LOCALE_ITEM, locale)
  return true
}
export function hasLocale() {
  const fromStore = localStorage.getItem(STORE_LOCALE_ITEM)
  return Boolean(fromStore)
}
