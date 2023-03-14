import { useQuery } from '@tanstack/react-query'
// import { use } from 'next/navigation'
import { LanguageKeys } from '../../types/languageKeys'
import { getLanguageByLocale } from '../utils/handleLocale'

export function useTranslation() {
  // const router = u()
  const locale = undefined // router.locale

  const { data } = useQuery([locale], async () => getLanguageByLocale(locale))

  function t(toTranslate: LanguageKeys) {
    if (!data) return ''
    return data[toTranslate]
  }
  return { t }
}
