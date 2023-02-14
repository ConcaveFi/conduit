export const DEFAULT_LAYOUT = [
  { i: 'order-form', x: 0, y: 0, w: 3, h: 27 },
  { i: 'chart-panel', x: 3, y: 0, w: 6, h: 15 },
  { i: 'views-panel', x: 3, y: 15, w: 6, h: 6 },
  { i: 'news-panel', x: 9, y: 0, w: 3, h: 9 },
  { i: 'trades-panel', x: 9, y: 9, w: 3, h: 9.5 },
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
