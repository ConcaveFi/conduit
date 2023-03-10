import { useTranslation } from '@tradex/languages'
import { createContext, useContext, useState } from 'react'
import { AddWidgetOverlay } from 'src/components/futures/widgets/AddWidgetOverlay'
import { useDisclosure } from 'src/hooks/useDisclosure'
import { GridWidget, GridWidgets } from 'src/utils/grid.widgets'

interface WidgetsContext {
  addWidgets(_widgets: GridWidgets[]): void
  removeWidget(widget: GridWidgets): Promise<GridWidgets | undefined>
  hasWidget(_widgets: GridWidgets): boolean
  widgets: GridWidgets[]
}
const WidgetsContext = createContext<WidgetsContext>({
  removeWidget: async () => undefined,
  hasWidget: () => true,
  addWidgets() {},
  widgets: [],
})

export const useWidgets = () => useContext(WidgetsContext)
export function WidgetsProvider({ children }: any) {
  const [widgets, setWidgets] = useState(
    GridWidget.getStoredWidgets() || GridWidget.getDefaultWidgets(),
  )

  function addWidgets(w: GridWidgets[]) {
    const _widgets = [...widgets]
    for (const newWidget of w) {
      if (!_widgets.includes(newWidget)) _widgets.push(newWidget)
    }
    setWidgets(_widgets)
    GridWidget.storeWidgets(_widgets)
  }

  async function removeWidget(widget: GridWidgets) {
    const _widgets = widgets.filter((w) => w !== widget)
    setWidgets(_widgets)
    GridWidget.storeWidgets(_widgets)
    return widget
  }

  function hasWidget(_widget: GridWidgets) {
    const _hasWidget = widgets.filter((w) => w === _widget).length === 1
    return _hasWidget
  }

  return (
    <WidgetsContext.Provider value={{ hasWidget, widgets, addWidgets, removeWidget }}>
      {children}
      <AddWidgetOverlay />
    </WidgetsContext.Provider>
  )
}
