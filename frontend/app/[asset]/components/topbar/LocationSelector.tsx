import { Menu } from '@tradex/interface'
import { storeLocale } from '@tradex/languages'
import Image from 'next/image'
// import { useRouter } from 'next/router'
import { LOCALE_NAME, SUPPORTED_LOCALES } from 'utils/locale'

export function LocationSelector() {
  // const router = useRouter()
  // const locale = router.locale as string
  const locale = 'us'

  function handleClick(locale: string) {
    storeLocale(locale)
    // router.replace({ query, pathname }, asPath, { locale })
  }

  return (
    <Menu className="centered flex ">
      <Menu.Button className="box-6">
        <Image
          src={`/assets/flags/${LOCALE_NAME[locale]}.png`}
          className="w-auto object-contain "
          alt="usa"
          fill
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
