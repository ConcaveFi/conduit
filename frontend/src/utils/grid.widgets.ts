import { DivProps, PanelProps } from '@tradex/interface'
import { ViewPanels } from 'src/components/futures/ViewPanels'
import { ChartPanel } from 'src/perpetuals/chart/ChartPanel'
import { NewsPanel } from 'src/perpetuals/NewsPanel'
import { OrderFormPanel } from 'src/perpetuals/order-form/OrderFormPanel'
import { RecentTradesPanel } from 'src/perpetuals/RecentTradesPanel'
import { runInThisContext } from 'vm'

export type GridWidgets =
  | 'order-panel'
  | 'news-panel'
  | 'chart-panel'
  | 'trades-panel'
  | 'views-panel'

export class GridWidget {
  public static storageItem: 'grid.widgets'
  public static getDefaultWidgets(): GridWidgets[] {
    return ['order-panel', 'news-panel', 'chart-panel', 'trades-panel', 'views-panel']
  }

  public static toPanel(panel: GridWidgets) {
    switch (panel) {
      case 'chart-panel':
        return ChartPanel
      case 'news-panel':
        return NewsPanel
      case 'order-panel':
        return OrderFormPanel
      case 'trades-panel':
        return RecentTradesPanel
      case 'views-panel':
        return ViewPanels
    }
  }

  public static getStoredWidgets() {
    const raw = localStorage.getItem(this.storageItem)
    if (!raw) return

    const widgets = JSON.parse(raw)
    return widgets as GridWidgets[]
  }
}
