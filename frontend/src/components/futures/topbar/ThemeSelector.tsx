import { useEffect, useState } from 'react'
import { Theme } from 'src/utils/themeHandler'
export function ThemeSelector() {
  const [theme, setTheme] = useState(Theme.getStoredTheme())

  useEffect(() => Theme.toDOM(theme), [theme])

  // This feature will be disabled temporaly ultill we get a good theming at figma
  return <></>

  // return (
  //   <Menu className="flex justify-center">
  //     <Menu.Button>
  //       <img src={`/assets/theme/${theme}.png`} width={25} alt="" />
  //     </Menu.Button>
  //     <Menu.Items className="card card-translucent-glass  w-14 gap-2 p-3 font-semibold dark:text-left">
  //       {Object.values(Themes)
  //         .filter((_theme) => _theme !== theme)
  //         .map((_theme) => (
  //           <Menu.Button
  //             key={_theme}
  //             onClick={() => setTheme((prev) => Theme.switch(_theme, prev))}
  //             className="btn btn-underline.secondary centered"
  //           >
  //             <img src={`/assets/theme/${_theme}.png`} alt="" />
  //           </Menu.Button>
  //         ))}
  //     </Menu.Items>
  //   </Menu>
  // )
}
