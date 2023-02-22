import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { LanguageKeys } from '../../types/languages'
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
