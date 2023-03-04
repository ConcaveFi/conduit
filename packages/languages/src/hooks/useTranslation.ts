import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { LanguageKeys } from '../../types/languageKeys'
import { getLanguageByLocale } from '../utils/handleLocale'

export function useTranslation() {
  const router = useRouter()
  const locale = router.locale

  const { data } = useQuery([locale], async () => getLanguageByLocale(locale))

  function t(toTranslate: LanguageKeys) {
    if (!data) return ''
    return data[toTranslate]
  }
  return { t }
}
