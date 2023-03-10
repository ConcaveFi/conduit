import { useCallback, useState } from 'react'
import ReactGridLayout from 'react-grid-layout'
import { useGridLayout } from 'src/hooks/useGridLayout'
import { useResizeObserver } from 'src/hooks/useResizeObserver'
import { useWidgets } from 'src/providers/WidgetsProvider'
import { DEFAULT_LAYOUT, WIDGET_PRESETS } from 'src/utils/gridLayout'
import { GRID_WIDGETS } from 'src/utils/gridWidgets'

const DEFAULT_COLS = 12
const DEFAULT_ROW_HEIGHT = 145
export function GridLayout() {
  const { handleChange, isMaximized, maximize, maximizedPanel, minimize, removeGridWidget } =
    useGridLayout()
  const [width, setWidth] = useState(0)
  const onResize = useCallback((e) => setWidth(e[0].target.clientWidth), [])
  const { ref, height } = useResizeObserver<HTMLDivElement>(onResize)
  const { widgets, removeWidget } = useWidgets()

  return (
    <div ref={ref} className="ocean:bg-ocean-900 flex h-full w-full sm">
      <ReactGridLayout
        style={{ height: '100%' }}
        draggableHandle="[data-draggable='true']"
        rowHeight={isMaximized ? height : DEFAULT_ROW_HEIGHT}
        cols={isMaximized ? 1 : DEFAULT_COLS}
        className="relative transition-all "
        onLayoutChange={handleChange}
        containerPadding={[0, 0]}
        useCSSTransforms
        layout={DEFAULT_LAYOUT}
        width={width}
      >
        {widgets.map((key) => {
          const Panel = GRID_WIDGETS[key]
          const isHidden = isMaximized && maximizedPanel !== key
          return (
            <Panel
              onClose={() => removeWidget(key).then(removeGridWidget)}
              style={{ display: isHidden ? 'none' : 'flex' }}
              className="duration-300 ease-out"
              onMaximize={() => maximize(key)}
              data-grid={WIDGET_PRESETS[key]}
              onMinimize={() => minimize()}
              key={key}
            />
          )
        })}
      </ReactGridLayout>
    </div>
  )
}
