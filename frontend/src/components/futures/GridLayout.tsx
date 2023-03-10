import { useMemo } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { useGridLayout } from 'src/hooks/useGridLayout'
import { useWidgets } from 'src/providers/WidgetsProvider'
import { GridWidget } from 'src/utils/grid/grid.widgets'

const ReactGridLayout = WidthProvider(RGL)
const GRID_COLS = 12
const GRID_ROW_HEIGHT = 145

export function GridLayout() {
  const { handleChange, layout } = useGridLayout()
  const { widgets, removeWidget } = useWidgets()

  const panels = useMemo(() => {
    return widgets.map((widget) => {
      const Panel = GridWidget.toPanel(widget)
      return <Panel className="duration-300 ease-out" key={widget} />
    })
  }, [widgets])

  if (!layout) return <></>
  return (
    <div className="ocean:bg-ocean-900 flex h-full w-full sm">
      <ReactGridLayout
        className="relative transition-all w-full h-full"
        draggableHandle="[data-draggable='true']"
        onLayoutChange={handleChange}
        rowHeight={GRID_ROW_HEIGHT}
        containerPadding={[0, 0]}
        cols={GRID_COLS}
        useCSSTransforms
        layout={layout}
      >
        {panels}
      </ReactGridLayout>
    </div>
  )
}
