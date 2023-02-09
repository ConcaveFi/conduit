interface WidgetProps {
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
}
declare var TradingView: {
  widget(props: WidgetProps): void
}
