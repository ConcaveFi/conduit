'use client'

import { createContext, MutableRefObject, useContext, useRef, useState } from 'react'
import { GridWidget, GridWidgets } from 'utils/grid/grid.widgets'
import { AddWidgetOverlay } from '../[asset]/components/widgets/AddWidgetOverlay'

type AddWidgetsEventListener = { event: 'add'; callback(widgets: GridWidgets[]): void }
type RemoveWidgetsEventListener = { event: 'remove'; callback(widget: GridWidgets): void }

class WidgetEvents {
  private addWidgetsListeners: AddWidgetsEventListener[] = []
  private removeWidgetsListeners: RemoveWidgetsEventListener[] = []

  public on(event: 'add', callback: (widgets: GridWidgets[]) => void): void
  public on(event: 'remove', callback: (widgets: GridWidgets) => void): void
  public on(event: 'add' | 'remove', callback) {
    if (event === 'add') {
      this.addWidgetsListeners.push({ event, callback })
    } else {
      this.removeWidgetsListeners.push({ event, callback })
    }
  }

  public off(event: 'add', callback: (widgets: GridWidgets[]) => void): void
  public off(event: 'remove', callback: (widgets: GridWidgets) => void): void
  public off(event: 'add' | 'remove', callback): void {
    if (event === 'add') {
      const listenerIndex = this.addWidgetsListeners.findIndex((v, i) => {
        return v.callback.toString() === callback.toString() && v.event === event
      })
      this.addWidgetsListeners.splice(listenerIndex, 1)
    } else {
      const listenerIndex = this.removeWidgetsListeners.findIndex((v, i) => {
        return v.callback.toString() === callback.toString() && v.event === event
      })
      this.removeWidgetsListeners.splice(listenerIndex, 1)
    }
  }

  public getAddEventListeners(): AddWidgetsEventListener[] {
    return this.addWidgetsListeners
  }

  public getRemoveEventListeners(): RemoveWidgetsEventListener[] {
    return this.removeWidgetsListeners
  }

  public callListeners(event: 'add', widgets: GridWidgets[]): void
  public callListeners(event: 'remove', widget: GridWidgets): void
  public callListeners(event: 'add' | 'remove', payload: GridWidgets | GridWidgets[]): void {
    if (event === 'add' && Array.isArray(payload)) {
      this.addWidgetsListeners.forEach((listener) => listener.callback(payload))
    } else if (event === 'remove' && typeof payload === 'string') {
      this.removeWidgetsListeners.forEach((listener) => listener.callback(payload))
    }
  }
}

interface WidgetsContext {
  addWidgets(_widgets: GridWidgets[]): void
  removeWidget(widget: GridWidgets): Promise<GridWidgets | undefined>
  hasWidget(_widgets: GridWidgets): boolean
  events: MutableRefObject<WidgetEvents>
  widgets: GridWidgets[]
}
const WidgetsContext = createContext<WidgetsContext>({
  removeWidget: async () => undefined,
  events: { current: new WidgetEvents() },
  hasWidget: () => true,
  addWidgets() {},
  widgets: [],
})
export const useWidgets = () => useContext(WidgetsContext)

export function WidgetsProvider({ children }: any) {
  const events = useRef(new WidgetEvents())
  const [widgets, setWidgets] = useState(
    GridWidget.getStoredWidgets() || GridWidget.getDefaultWidgets(),
  )

  /**
   * This function will change the state with the added widgets
   * and store on the localstore those added widgets
   * after everything is done, events listeners are triggered
   * @param w
   */
  function addWidgets(_widgets: GridWidgets[]) {
    const newWidgets = [...widgets]
    for (const newWidget of _widgets) {
      if (!newWidgets.includes(newWidget)) newWidgets.push(newWidget)
    }
    setWidgets(newWidgets)
    GridWidget.storeWidgets(newWidgets)
    events.current.callListeners('add', _widgets)
  }

  /**
   * This function will change the state with the removed widgets
   * and store on the localstore those removed widgets
   * after everything is done, events listeners are triggered.
   * @param w
   */
  async function removeWidget(widget: GridWidgets) {
    const _widgets = widgets.filter((w) => w !== widget)
    setWidgets(_widgets)
    GridWidget.storeWidgets(_widgets)
    events
    return widget
  }

  function hasWidget(_widget: GridWidgets) {
    const _hasWidget = widgets.filter((w) => w === _widget).length === 1
    return _hasWidget
  }

  return (
    <WidgetsContext.Provider value={{ hasWidget, widgets, addWidgets, removeWidget, events }}>
      {children}
      <AddWidgetOverlay />
    </WidgetsContext.Provider>
  )
}
