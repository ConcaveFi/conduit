import { Button, Menu } from '@tradex/interface'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { LOCALE_NAME } from 'src/utils/localeNames'

export function LocationSelector() {
  const router = useRouter()
  const { asPath, pathname, query } = router
  const locales = router.locales as string[]
  const locale = router.locale as string
  return (
    <Menu centered>
      <Menu.Button>
        <Image
          src={`/assets/flags/${LOCALE_NAME[locale]}.png`}
          className="object-contain"
          alt="usa"
          width={25}
          height={10}
        />
      </Menu.Button>
      <Menu.Items column className="p-2 w-14" variant={'glass'}>
        {locales.map((locale) => (
          <Menu.Item key={locale}>
            <Button onClick={() => router.push({ query, pathname }, asPath, { locale })}>
              <Flag loc={locale} />
            </Button>
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
