import { GridWidgets } from 'utils/grid/grid.widgets'

export type AddWidgetsEventListener = { event: 'add'; callback(widgets: GridWidgets[]): void }
export type RemoveWidgetsEventListener = { event: 'remove'; callback(widget: GridWidgets): void }

export class WidgetEvents {
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
