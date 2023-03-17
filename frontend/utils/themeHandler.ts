export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
  OCEAN = 'ocean',
}

export class Theme {
  public static readonly itemStore = 'theme'
  public static readonly defaultTheme = Themes.DARK

  private constructor() {}

  public static getStoredTheme(): Themes | undefined {
    if (typeof localStorage == 'undefined') return undefined

    const theme = localStorage.getItem(this.itemStore)
    if (!theme) return undefined
    return theme as Themes
  }

  public static set(newTheme: Themes) {
    this.removePrev()
    this.storeTheme(newTheme)
    this.toDOM(newTheme)
    return newTheme
  }

  public static storeTheme(theme: Themes) {
    if (typeof theme === 'undefined') return
    localStorage.setItem(this.itemStore, theme)
  }

  private static removePrev() {
    if (typeof document === 'undefined') return
    const prevTheme = document.documentElement.getAttribute('theme')
    if (prevTheme === null) return

    document.documentElement.classList.remove(prevTheme)
  }

  public static initialize(): Themes {
    const storedTheme = Theme.getStoredTheme()
    const theme = storedTheme || Theme.defaultTheme
    this.toDOM(theme)
    this.storeTheme(theme)
    return theme
  }

  public static toDOM(theme: Themes) {
    // Why return if theme is equals default ?
    // as theme is default, we assume that no aditional class is needed to handle it,
    // so that we avoid doing extra css processing.
    // Because of that, scenes like (class="bg-dark-900 light:bg-light-200 ocean:bg-ocean-5000") is possible.
    // So that you do not need to put "dark:bg-dark-900".
    if (theme === this.defaultTheme) return
    document.documentElement.classList.add(theme)
    document.documentElement.setAttribute('theme', theme)
  }
}
