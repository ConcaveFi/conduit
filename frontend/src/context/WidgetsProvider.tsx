import { PlusIcon } from '@tradex/icons'
import { Button, Container } from '@tradex/interface'
import { createContext, useContext, useState } from 'react'
import { AddWidgetModal } from 'src/components/widgets/AddWidgetModal'
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
      <Container
        expand={'all'}
        space="spacius"
        justify={'end'}
        align="end"
        className="fixed pointer-events-none"
      >
        <Button
          onClick={modal.onOpen}
          className="px-8 py-4 gap-3 shadow-xl pointer-events-auto"
          variant={'green-gradient'}
        >
          <PlusIcon className="fill-ocean-900" />
          Add Widget
        </Button>
        <AddWidgetModal isOpen={modal.isOpen} onClose={modal.onClose} />
      </Container>
    </WidgetsContext.Provider>
  )
}
