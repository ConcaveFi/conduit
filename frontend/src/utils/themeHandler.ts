export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
  OCEAN = 'ocean',
}
export const THEME_ITEM = 'theme'
export const DEFAULT_THEME = Themes.LIGHT

export class Theme {
  private constructor() {}

  public static getStoredTheme(): Themes {
    const theme = localStorage.getItem(THEME_ITEM) || DEFAULT_THEME
    return theme as Themes
  }

  public static select(newTheme: Themes) {
    if (newTheme !== Themes.LIGHT) document.documentElement.classList.add(newTheme)
    Theme.removeAll({ exception: newTheme })
    Theme.storeTheme(newTheme)
    return newTheme
  }

  public static storeTheme(theme: Themes) {
    switch (theme) {
      case Themes.LIGHT: {
        localStorage.setItem(THEME_ITEM, '')
        return
      }
      default: {
        localStorage.setItem(THEME_ITEM, theme)
        break
      }
    }
  }

  public static removeAll({ exception }: { exception: Themes }) {
    for (let [_, theme] of Object.entries(Themes)) {
      if (theme === exception) continue
      document.documentElement.classList.remove(theme)
    }
  }
}
