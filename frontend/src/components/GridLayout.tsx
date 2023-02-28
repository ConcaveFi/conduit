import ReactGridLayout from 'react-grid-layout'
import { useWidgets } from 'src/context/WidgetsProvider'
import { useGridLayout } from 'src/hooks/useGridLayout'
import { useResizeObserver } from 'src/hooks/useResizeObserver'
import { WIDGET_PRESETS } from 'src/utils/gridLayout'
import { GRID_WIDGETS } from 'src/utils/gridWidgets'

const DEFAULT_COLS = 12
const DEFAULT_ROW_HEIGHT = 145

export function GridLayout() {
  const {
    handleChange,
    isMaximized,
    layout,
    maximize,
    maximizedPanel,
    minimize,
    removeGridWidget,
  } = useGridLayout()
  const { ref, width, height } = useResizeObserver<HTMLDivElement>()
  const { widgets, removeWidget } = useWidgets()

  return (
    <div ref={ref} className="ocean:bg-ocean-900 flex h-full w-full">
      <ReactGridLayout
        style={{ height: isMaximized ? '100%' : 'fit-content' }}
        rowHeight={isMaximized ? height : DEFAULT_ROW_HEIGHT}
        draggableHandle="[data-draggable='true']"
        cols={isMaximized ? 1 : DEFAULT_COLS}
        className="relative transition-all "
        onLayoutChange={handleChange}
        containerPadding={[0, 0]}
        useCSSTransforms
        layout={layout}
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
