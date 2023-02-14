import { Flex, Panel } from '@tradex/interface'
import { useEffect, useRef, useState } from 'react'
import ReactGridLayout from 'react-grid-layout'
import { ChartPanel } from 'src/components/chart/ChartPanel'
import { NewsPanel } from 'src/components/strategy/NewsPanel'
import { OrderFormPanel } from 'src/components/strategy/OrderFormPanel'
import { RecentTradesPanel } from 'src/components/strategy/RecentTradesPanel'
import { ViewPanels } from 'src/components/ViewPanels'

export function GridLayout() {
  const layout: ReactGridLayout.Layout[] = [
    { i: 'order-form', x: 0, y: 0, w: 3, h: 27 },
    { i: 'chart-panel', x: 3, y: 0, w: 6, h: 15 },
    { i: 'views-panel', x: 3, y: 15, w: 6, h: 6 },
    { i: 'news-panel', x: 9, y: 0, w: 3, h: 9 },
    { i: 'trades-panel', x: 9, y: 9, w: 3, h: 9.5 },
  ]
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
        layout={layout}
        cols={12}
        rowHeight={30}
        width={width}
        containerPadding={[0, 0]}
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
