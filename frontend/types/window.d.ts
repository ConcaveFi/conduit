interface TVWidgetOptions {
  autosize?: boolean
  symbol?: string
  interval?: string
  timezone?: string
  style?: string
  locale?: string
  toolbar_bg?: string
  enable_publishing?: false
  allow_symbol_change?: boolean
  theme?: 'dark' | 'light'
  container_id?: string
  width?: string | number
  height?: string | number
  popup_width?: string | number
  popup_height?: string | number
  show_popup_button?: boolean
  studies?: string[]
  save_image?: boolean
  hide_side_toolbar?: boolean
  withdateranges?: boolean
}

interface TVWidget {
  id: string
  iframe: HTMLIFrameElement
  options: TVWidgetOptions
}

declare var TradingView: {
  widget(props: TVWidgetOptions): void
}
