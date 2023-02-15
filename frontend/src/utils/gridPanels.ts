import { ChartPanel } from 'src/components/chart/ChartPanel'
import { NewsPanel } from 'src/components/strategy/NewsPanel'
import { OrderFormPanel } from 'src/components/strategy/OrderFormPanel'
import { RecentTradesPanel } from 'src/components/strategy/RecentTradesPanel'
import { ViewPanels } from 'src/components/ViewPanels'
export const GridPanels = {
  'order-panel': OrderFormPanel,
  'news-panel': NewsPanel,
  'chart-panel': ChartPanel,
  'trades-panel': RecentTradesPanel,
  'views-panel': ViewPanels,
}

export type GridPanelKeys = keyof typeof GridPanels
