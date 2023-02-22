import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import example from '../translations/example.json'
import { getLanguageByLocale } from '../utils/handleLocale'
type Options = keyof typeof example

export function useTranslation() {
  const router = useRouter()
  const locale = router.locale
  const { data } = useQuery([locale], async () => getLanguageByLocale(locale))

  function t(toTranslate: Options) {
    if (!data) return ''
    return data[toTranslate]
  }
  return { t }
}
