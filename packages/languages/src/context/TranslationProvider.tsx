import { useRouter } from 'next/router'
import { createContext, useEffect } from 'react'
import { getStoredLocale, hasLocale } from '../utils/localeStore'

const TranslationContext = createContext({})

export function TranslationProvider({ children }) {
  const router = useRouter()
  const { locale, asPath, pathname, query } = router

  function handleLocation() {
    if (!hasLocale()) return
    const fromStorage = getStoredLocale()
    if (fromStorage === locale) return
    router.push({ pathname, query }, asPath, { locale: fromStorage })
  }
  useEffect(handleLocation, [])

  return <TranslationContext.Provider value={{}}>{children}</TranslationContext.Provider>
}
