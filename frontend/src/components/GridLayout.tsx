import { Flex } from '@tradex/interface'
import { useState } from 'react'
import ReactGridLayout from 'react-grid-layout'
import { useGridLayout } from 'src/hooks/useGridLayout'
import { useResizeObserver } from 'src/hooks/useResizeObserver'
import { getStoredLayout } from 'src/utils/gridLayout'
import {
  DEFAULT_GRID_WIDGETS,
  getStoredWidgets,
  GridWidget,
  GridWidgetKeys,
  GRID_WIDGETS,
  storeWidgets,
} from 'src/utils/gridWidgets'

const DEFAULT_COLS = 12
const DEFAULT_ROW_HEIGHT = 145

export function GridLayout() {
  const { handleChange, isMaximized, layout, maximize, maximizedPanel, minimize } = useGridLayout()
  const { ref, width, height } = useResizeObserver<HTMLDivElement>()

  const [widgets, setWidgets] = useState(getStoredWidgets() || DEFAULT_GRID_WIDGETS)
  function removeWidget(key: string) {
    const newWidgets = widgets.filter((w) => w !== key)
    storeWidgets(newWidgets)
    setWidgets(newWidgets)
  }

  return (
    <Flex ref={ref} className="w-full h-full bg-ocean-900">
      <ReactGridLayout
        style={{ height: isMaximized ? '100%' : 'fit-content' }}
        rowHeight={isMaximized ? height : DEFAULT_ROW_HEIGHT}
        draggableHandle="[data-draggable='true']"
        cols={isMaximized ? 1 : DEFAULT_COLS}
        className="relative transition-all "
        onLayoutChange={handleChange}
        containerPadding={[0, 0]}
        layout={layout}
        width={width}
      >
        {widgets.map((key) => {
          const Panel = GRID_WIDGETS[key]
          return (
            <Panel
              hidden={isMaximized && maximizedPanel !== key}
              onMaximize={() => maximize(key)}
              onMinimize={() => minimize()}
              onClose={() => removeWidget(key)}
              key={key}
            />
          )
        })}
      </ReactGridLayout>
    </Flex>
  )
}
