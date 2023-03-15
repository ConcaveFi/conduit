export enum Themes {
  LIGHT = 'light',
  // DARK = 'dark',
  OCEAN = 'ocean',
}
export const THEME_ITEM = 'theme'
export const DEFAULT_THEME = Themes.OCEAN

export class Theme {
  private constructor() {}
  public static getStoredTheme(): Themes {
    const theme =
      typeof localStorage !== 'undefined' ? localStorage.getItem(THEME_ITEM) : DEFAULT_THEME
    return (theme || DEFAULT_THEME) as Themes
  }

  public static switch(newTheme: Themes, prevTheme: Themes) {
    document.documentElement.classList.remove(prevTheme)
    this.storeTheme(newTheme)
    this.toDOM(newTheme)
    return newTheme
  }

  public static storeTheme(theme: Themes) {
    switch (theme) {
      case Themes.LIGHT: {
        localStorage.setItem(THEME_ITEM, '')
        break
      }
      default: {
        localStorage.setItem(THEME_ITEM, theme)
        break
      }
    }
  }
  public static toDOM(theme: Themes) {
    if (theme !== Themes.LIGHT) document.documentElement.classList.add(theme)
  }
}
