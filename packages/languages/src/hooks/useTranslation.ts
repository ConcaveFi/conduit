import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { example } from '../translations'
import pt from '../translations/pt.json'
import us from '../translations/us.json'
import { getLanguageByLocale } from '../utils/handleLocale'
type Options = keyof typeof example
export const LANGUAGE_BY_LOCALE: { [key: string]: { [key in Options]: string } } = { pt, us }

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
