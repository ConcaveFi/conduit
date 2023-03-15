import { DivProps } from '@tradex/interface'
import { useGridLayout } from 'hooks/useGridLayout'
import { useMemo } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { GridWidget } from 'utils/grid/grid.widgets'
import { useWidgets } from '../../providers/WidgetsProvider'

const ReactGridLayout = WidthProvider(RGL)
const GRID_COLS = 12
const GRID_ROW_HEIGHT = 145

export function GridLayout() {
  const { handleChange, layout } = useGridLayout()
  const { widgets, removeWidget } = useWidgets()

  const panels = useMemo(() => {
    return widgets.map((widget) => {
      const Panel = GridWidget.toPanel(widget) as React.FC<DivProps>
      return <Panel key={widget} />
    })
  }, [widgets])

  if (!layout) return <></>

  return (
    <div className="ocean:bg-ocean-900 sm flex h-full w-full">
      <ReactGridLayout
        className="relative h-full w-full transition-all"
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
