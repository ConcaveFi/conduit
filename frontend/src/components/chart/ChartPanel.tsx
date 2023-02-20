import { Panel } from '@tradex/interface'
import { PrimitiveDivProps } from '@tradex/interface/types/primitives'
import { forwardRef, useEffect, useState } from 'react'
import { useRouterEvents } from 'src/hooks/useRouterEvents'
import { useScriptLoader } from 'src/hooks/useScriptLoader'
import { createTVwidget } from 'src/utils/createTVwidget'
import { findValueOnUrl, queryUrl } from 'src/utils/urlHandler'

const TRADING_VIEW_SRC = 'https://s3.tradingview.com/tv.js'
const SCRIPT_TYPE = 'text/javascript'

export const ChartPanel = forwardRef<HTMLDivElement, PrimitiveDivProps>((props, ref) => {
  const [widget, setWidget] = useState<TVWidget>()
  const [asset, setAsset] = useState('ETH')
  const id = 'chart-container'

  const { router } = useRouterEvents({ routeComplete: (e) => setAsset(findValueOnUrl(e, 'asset')) })

  useEffect(() => {
    if (router.query.asset) setAsset(router.query.asset as string)
  }, [router.isReady])

  const loadChart = () => setWidget(createTVwidget({ container_id: id }))
  useScriptLoader(TRADING_VIEW_SRC, SCRIPT_TYPE, loadChart)

  return <Panel name="Chart" variant="secondary" {...props} ref={ref} bodyProps={{ id }} />
})
