import { GridWidgetKeys } from './gridWidgets'

export const WIDGET_PRESETS: { [key in GridWidgetKeys]: {} } = {
  'chart-panel': { x: 3, y: 0, w: 6, h: 4 },
  'news-panel': { x: 9, y: 0, w: 3, h: 2.4 },
  'order-panel': { x: 0, y: 0, w: 3, h: 4.4 },
  'trades-panel': { x: 9, y: 9, w: 3, h: 2.4 },
  'views-panel': { x: 3, y: 15, w: 6, h: 1.5 },
}
export const DEFAULT_LAYOUT = [
  { i: 'chart-panel', ...WIDGET_PRESETS['chart-panel'] },
  { i: 'trades-panel', ...WIDGET_PRESETS['trades-panel'] },
  { i: 'views-panel', ...WIDGET_PRESETS['views-panel'] },
  { i: 'news-panel', ...WIDGET_PRESETS['news-panel'] },
  { i: 'order-panel', ...WIDGET_PRESETS['order-panel'] },
] as ReactGridLayout.Layout[]

const STORED_GRID_ITEM = 'grid-layout'

export function getStoredLayout() {
  const rawLayout = localStorage.getItem(STORED_GRID_ITEM)
  if (!rawLayout) return DEFAULT_LAYOUT
  const layout = JSON.parse(rawLayout || '[]')
  return layout as ReactGridLayout.Layout[]
}

export function storeLayout(layout: ReactGridLayout.Layout[]) {
  if (!layout) return false
  const formattedLayout = JSON.stringify(layout)
  localStorage.setItem(STORED_GRID_ITEM, formattedLayout)
  return true
}
