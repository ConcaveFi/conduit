import { createContext, useContext, useMemo, useState } from 'react'
import { Theme, Themes } from 'utils/themeHandler'

interface ThemeContextValues {
  theme?: Themes
  changeTheme(theme: Themes): void
}

const ThemeContext = createContext<ThemeContextValues>({
  changeTheme(theme: Themes) {},
  theme: Theme.defaultTheme,
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<Themes>(Theme.initialize())

  function changeTheme(_theme: Themes) {
    Theme.set(_theme)
    setTheme(_theme)
  }

  return (
    <ThemeContext.Provider value={useMemo(() => ({ theme, changeTheme }), [theme])}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
