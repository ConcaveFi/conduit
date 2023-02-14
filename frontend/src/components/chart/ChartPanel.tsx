import { Panel } from '@tradex/interface'
import { PrimitiveDivProps } from '@tradex/interface/types/primitives'
import { forwardRef } from 'react'
import { useScriptLoader } from 'src/hooks/useScriptLoader'
import { createTVwidget } from 'src/utils/createTVwidget'

const TRADING_VIEW_SRC = 'https://s3.tradingview.com/tv.js'
const SCRIPT_TYPE = 'text/javascript'

export const ChartPanel = forwardRef<HTMLDivElement, PrimitiveDivProps>((props, ref) => {
  const [className, id] = ['h-[560px]', 'chart-container']
  useScriptLoader(TRADING_VIEW_SRC, SCRIPT_TYPE, loadChart)

  function loadChart() {
    createTVwidget({ container_id: id })
  }

  return <Panel name="Chart" {...props} ref={ref} bodyProps={{ className, id }} />
})
