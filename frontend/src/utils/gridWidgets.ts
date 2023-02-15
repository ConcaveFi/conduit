import { PanelProps } from '@tradex/interface'
import { ChartPanel } from 'src/components/chart/ChartPanel'
import { NewsPanel } from 'src/components/strategy/NewsPanel'
import { OrderFormPanel } from 'src/components/strategy/OrderFormPanel'
import { RecentTradesPanel } from 'src/components/strategy/RecentTradesPanel'
import { ViewPanels } from 'src/components/ViewPanels'
export type GridWidget = { [key: string]: React.FC<PanelProps> }

export type GridWidgetKeys =
  | 'order-panel'
  | 'news-panel'
  | 'chart-panel'
  | 'trades-panel'
  | 'views-panel'

export const DEFAULT_GRID_WIDGETS = {
  'order-panel': OrderFormPanel,
  'news-panel': NewsPanel,
  'chart-panel': ChartPanel,
  'trades-panel': RecentTradesPanel,
  'views-panel': ViewPanels,
} as GridWidget

Object.freeze(DEFAULT_GRID_WIDGETS)
