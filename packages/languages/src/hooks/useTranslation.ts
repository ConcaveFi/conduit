import { useRouter } from 'next/router'
import pt from '../translations/pt.json'
import us from '../translations/us.json'

type Options = keyof typeof pt
export const LANGUAGE_BY_LOCALE: { [key: string]: { [key in Options]: string } } = { pt, us }

export function useTranslation() {
  const router = useRouter()
  const locale = router.locale

  function t(toTranslate: Options) {
    const t = LANGUAGE_BY_LOCALE[locale!]
    return t[toTranslate]
  }
  return { t }
}
