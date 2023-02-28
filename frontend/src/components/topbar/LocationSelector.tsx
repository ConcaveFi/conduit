import { Menu } from '@tradex/interface'
import { storeLocale } from '@tradex/languages'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { LOCALE_NAME } from 'src/utils/localeNames'

export function LocationSelector() {
  const router = useRouter()
  const { asPath, pathname, query } = router
  const locales = router.locales as string[]
  const locale = router.locale as string

  function handleClick(locale: string) {
    storeLocale(locale)
    router.push({ query, pathname }, asPath, { locale })
  }

  return (
    <Menu centered>
      <Menu.Button>
        <Image
          src={`/assets/flags/${LOCALE_NAME[locale]}.png`}
          className="object-contain"
          alt="usa"
          width={30}
          height={15}
        />
      </Menu.Button>
      <Menu.Items column className="w-14 p-2" variant={'glass'}>
        {locales.map((locale) => (
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

const Flag = ({ loc }: { loc: string }) => (
  <Image
    src={`/assets/flags/${LOCALE_NAME[loc]}.png`}
    className="object-contain"
    alt="usa"
    width={35}
    height={15}
  ></Image>
)
