import { Flex } from '@tradex/interface'
import ReactGridLayout from 'react-grid-layout'
import { useGridLayout } from 'src/hooks/useGridLayout'
import { useResizeObserver } from 'src/hooks/useResizeObserver'
import { GridPanels } from 'src/utils/gridPanels'

const DEFAULT_COLS = 12
const DEFAULT_ROW_HEIGHT = 145

export function GridLayout() {
  const { handleChange, isMaximized, layout, maximize, maximizedPanel, minimize } = useGridLayout()
  const { ref, width, height } = useResizeObserver<HTMLDivElement>()
  return (
    <Flex ref={ref} className="w-full h-full bg-ocean-900">
      <ReactGridLayout
        style={{ height: isMaximized ? '100%' : 'fit-content' }}
        rowHeight={isMaximized ? height : DEFAULT_ROW_HEIGHT}
        draggableHandle="[data-draggable='true']"
        cols={isMaximized ? 1 : DEFAULT_COLS}
        className="relative transition-all"
        onLayoutChange={handleChange}
        containerPadding={[0, 0]}
        layout={layout}
        width={width}
      >
        {Object.entries(GridPanels).map(([key, Panel]) => (
          <Panel
            hidden={isMaximized && maximizedPanel !== key}
            onMaximize={() => maximize(key)}
            onMinimize={() => minimize()}
            key={key}
          />
        ))}
      </ReactGridLayout>
    </Flex>
  )
}
