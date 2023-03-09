import { useTranslation } from '@tradex/languages'
import { createContext, useContext, useState } from 'react'
import { AddWidgetOverlay } from 'src/components/futures/widgets/AddWidgetOverlay'
import { useDisclosure } from 'src/hooks/useDisclosure'
import {
  DEFAULT_GRID_WIDGETS,
  getStoredWidgets,
  GridWidgetKeys,
  storeWidgets,
} from 'src/utils/gridWidgets'

interface WidgetsContext {
  addWidgets(_widgets: GridWidgetKeys[]): void
  removeWidget(widget: GridWidgetKeys): Promise<GridWidgetKeys | undefined>
  hasWidget(_widgets: GridWidgetKeys): boolean
  widgets: GridWidgetKeys[]
}
const WidgetsContext = createContext<WidgetsContext>({
  removeWidget: async () => undefined,
  hasWidget: () => true,
  addWidgets() {},
  widgets: [],
})

export const useWidgets = () => useContext(WidgetsContext)
export function WidgetsProvider({ children }: any) {
  const { t } = useTranslation()
  const modal = useDisclosure()
  const [widgets, setWidgets] = useState(getStoredWidgets() || DEFAULT_GRID_WIDGETS)

  function addWidgets(w: GridWidgetKeys[]) {
    const _widgets = [...widgets]
    for (const newWidget of w) {
      if (!_widgets.includes(newWidget)) _widgets.push(newWidget)
    }
    setWidgets(_widgets)
    storeWidgets(_widgets)
  }

  async function removeWidget(widget: GridWidgetKeys) {
    const _widgets = widgets.filter((w) => w !== widget)
    setWidgets(_widgets)
    storeWidgets(_widgets)
    return widget
  }

  function hasWidget(_widget: GridWidgetKeys) {
    const _hasWidget = widgets.filter((w) => w === _widget).length === 1
    return _hasWidget
  }

  return (
    <WidgetsContext.Provider value={{ hasWidget, widgets, addWidgets, removeWidget }}>
      {children}
      <AddWidgetOverlay />
      {/* <div className="pointer-events-none fixed flex h-screen w-full items-end justify-end p-6">
        <button
          onClick={modal.onOpen}
          className="btn btn-green-gradient pointer-events-auto gap-3 rounded-full px-8 py-4 shadow-xl"
        >
          {t('add widget')}
          <PlusIcon className="fill-ocean-900" />
        </button>
        <AddWidgetModal isOpen={modal.isOpen} onClose={modal.onClose} />
      </div> */}
    </WidgetsContext.Provider>
  )
}
