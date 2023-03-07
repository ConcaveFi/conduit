import { Menu } from '@tradex/interface'
import { storeLocale } from '@tradex/languages'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { LOCALE_NAME, SUPPORTED_LOCALES } from 'src/utils/locale'

export function LocationSelector() {
  const router = useRouter()
  const { asPath, pathname, query } = router
  const locale = router.locale as string

  function handleClick(locale: string) {
    storeLocale(locale)
    router.push({ query, pathname }, asPath, { locale })
  }

  return (
    <Menu className="centered flex ">
      <Menu.Button>
        <Image
          src={`/assets/flags/${LOCALE_NAME[locale]}.png`}
          className="w-auto object-contain"
          alt="usa"
          width={30}
          height={15}
        />
      </Menu.Button>
      <Menu.Items className="card card-translucent-glass w-14 flex-col p-2">
        {SUPPORTED_LOCALES.filter((loc) => loc !== locale).map((locale) => (
          <Menu.Item key={locale}>
            <button onClick={() => handleClick(locale)}>
              <Flag loc={locale} />
            </button>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}

const Flag = ({ loc }: { loc: string }) => {
  return (
    <Image
      src={`/assets/flags/${LOCALE_NAME[loc]}.png`}
      className="w-auto object-contain"
      alt="usa"
      width={35}
      height={15}
    />
  )
}
