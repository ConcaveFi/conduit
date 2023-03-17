import { Menu } from '@tradex/interface'
import { useTheme } from 'app/providers/ThemeProvider'
import Image from 'next/image'
import { Theme, Themes } from 'utils/themeHandler'
export function ThemeSelector() {
  const { changeTheme, theme } = useTheme()

  console.log(Theme.getStoredTheme())

  return (
    <Menu className="flex justify-center">
      <Menu.Button>
        <Image src={`/assets/theme/${theme}.png`} height={25} width={25} alt="" />
      </Menu.Button>
      <Menu.Items className="card card-translucent-glass  w-14 gap-2 p-3 font-semibold dark:text-left">
        {Object.values(Themes)
          .filter((_theme) => _theme !== theme)
          .map((_theme) => (
            <Menu.Button
              key={_theme}
              onClick={() => changeTheme(_theme)}
              className="btn btn-underline.secondary centered bg-dark"
            >
              <img src={`/assets/theme/${_theme}.png`} alt="" />
            </Menu.Button>
          ))}
      </Menu.Items>
    </Menu>
  )
}
