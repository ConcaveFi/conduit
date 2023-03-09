import { PanelProps } from '@tradex/interface'
import { ViewPanels } from 'src/components/futures/ViewPanels'
import { ChartPanel } from 'src/perpetuals/chart/ChartPanel'
import { NewsPanel } from 'src/perpetuals/NewsPanel'
import { OrderFormPanel } from 'src/perpetuals/order-form/OrderFormPanel'
import { RecentTradesPanel } from 'src/perpetuals/RecentTradesPanel'

export type GridWidget = { [key: string]: React.FC<PanelProps> }
export type GridWidgetKeys =
  | 'order-panel'
  | 'news-panel'
  | 'chart-panel'
  | 'trades-panel'
  | 'views-panel'

export const DEFAULT_GRID_WIDGETS: GridWidgetKeys[] = [
  'order-panel',
  'news-panel',
  'chart-panel',
  'trades-panel',
  'views-panel',
]
export const GRID_WIDGETS = {
  'order-panel': OrderFormPanel,
  'news-panel': NewsPanel,
  'chart-panel': ChartPanel,
  'trades-panel': RecentTradesPanel,
  'views-panel': ViewPanels,
}

export const WIDGETS_STORAGE = 'widgets'
export function getStoredWidgets() {
  const raw = localStorage.getItem(WIDGETS_STORAGE)
  if (!raw) return
  const widgets = JSON.parse(raw)
  return widgets as GridWidgetKeys[]
}

export function storeWidgets(widgets: GridWidgetKeys[]) {
  if (!widgets) return false
  const formatted = JSON.stringify(widgets)
  localStorage.setItem(WIDGETS_STORAGE, formatted)
  return true
}
