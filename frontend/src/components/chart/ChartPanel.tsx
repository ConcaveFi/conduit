import { Panel } from '@tradex/interface'
import { PrimitiveDivProps } from '@tradex/interface/types/primitives'
import { forwardRef, useState } from 'react'
import { useScriptLoader } from 'src/hooks/useScriptLoader'
import { createTVwidget } from 'src/utils/createTVwidget'

const TRADING_VIEW_SRC = 'https://s3.tradingview.com/tv.js'
const SCRIPT_TYPE = 'text/javascript'

export const ChartPanel = forwardRef<HTMLDivElement, PrimitiveDivProps>((props, ref) => {
  const [className, id] = ['h-[93.9%]', 'chart-container']
  const [widget, setWidget] = useState<TVWidget>()

  const loadChart = () => setWidget(createTVwidget({ container_id: id }))
  useScriptLoader(TRADING_VIEW_SRC, SCRIPT_TYPE, loadChart)

  return (
    <Panel name="Chart" variant="secondary" {...props} ref={ref} bodyProps={{ className, id }} />
  )
})
