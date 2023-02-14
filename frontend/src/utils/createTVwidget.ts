const DEFAULT_CHART_PROPS = {
  autosize: true,
  symbol: 'BINANCE:ETHUSDT',
  interval: 'D',
  timezone: 'Etc/UTC',
  theme: 'dark',
  style: '1',
  locale: 'us',
  toolbar_bg: '#000',
  enable_publishing: false,
  allow_symbol_change: true,
} as WidgetProps

function createTradingViewWidget(props?: WidgetProps) {
  if (!TradingView) return
  const finalProps = Object.assign(DEFAULT_CHART_PROPS, { ...props })
  return new TradingView.widget(finalProps) as TVWidget
}
export { createTradingViewWidget as createTVwidget }
