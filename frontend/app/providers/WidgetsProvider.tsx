'use client'

import { createContext, useContext, useState } from 'react'

import { GridWidget, GridWidgets } from 'utils/grid/grid.widgets'
import { AddWidgetOverlay } from '../[asset]/components/widgets/AddWidgetOverlay'
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

  /**
   * This function will change the state with the added widgets
   * and store on the localstorage those added widgets
   * after everything is done, events listeners are triggered
   * @param _widgets is the array of widgets wanted to be added
   */
  function addWidgets(_widgets: GridWidgets[]) {
    const newWidgets = [...widgets]
    for (const newWidget of _widgets) {
      if (!newWidgets.includes(newWidget)) newWidgets.push(newWidget)
    }
    setWidgets(newWidgets)
    GridWidget.storeWidgets(newWidgets)
  }

  /**
   * This function will change the state with the removed widgets
   * and store on the localstorage those removed widgets
   * after everything is done, events listeners are triggered.
   * @param widget is the object wanted to be removed
   */
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
