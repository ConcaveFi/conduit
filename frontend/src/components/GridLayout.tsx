import { Flex, Panel } from '@tradex/interface'
import { useEffect, useRef, useState } from 'react'
import ReactGridLayout from 'react-grid-layout'
import { ChartPanel } from 'src/components/chart/ChartPanel'
import { NewsPanel } from 'src/components/strategy/NewsPanel'
import { OrderFormPanel } from 'src/components/strategy/OrderFormPanel'
import { RecentTradesPanel } from 'src/components/strategy/RecentTradesPanel'
import { ViewPanels } from 'src/components/ViewPanels'
import { getStoredLayout, storeLayout } from 'src/utils/gridLayout'

export function GridLayout() {
  const [width, setWidth] = useState(0)
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return
    new ResizeObserver((e) => setWidth(e[0].target.clientWidth)).observe(ref.current)
  }, [])

  return (
    <Flex ref={ref} className="w-full bg-ocean-900">
      <ReactGridLayout
        draggableHandle="[data-draggable='true']"
        className="relative "
        layout={getStoredLayout()}
        cols={12}
        rowHeight={30}
        width={width}
        containerPadding={[0, 0]}
        onLayoutChange={storeLayout}
      >
        <OrderFormPanel key={'order-form'} />
        <NewsPanel key={'news-panel'} />
        <ChartPanel key={'chart-panel'} />
        <RecentTradesPanel key={'trades-panel'} />
        <ViewPanels key={'views-panel'} />
      </ReactGridLayout>
    </Flex>
  )
}
