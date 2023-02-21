import { Panel } from '@tradex/interface'
import { PrimitiveDivProps } from '@tradex/interface/types/primitives'
import { NextRouter } from 'next/router'
import { forwardRef, useCallback, useEffect, useState } from 'react'
import { useRouterEvents } from 'src/hooks/useRouterEvents'
import { useScriptLoader } from 'src/hooks/useScriptLoader'
import { createTVwidget } from 'src/utils/createTVwidget'
import { findValueOnUrl } from 'src/utils/urlHandler'

const TRADING_VIEW_SRC = 'https://s3.tradingview.com/tv.js'
const container_id = 'chart-container'
const DEFAULT_MARKET = 'ETH'
const PERP_SYMBOL = 'PERP'

export const ChartPanel = forwardRef<HTMLDivElement, PrimitiveDivProps>((props, ref) => {
  const [widget, setWidget] = useState<TVWidget>()
  const [asset, setAsset] = useState('')

  const loadChart = () => setWidget(createTVwidget({ container_id, symbol: asset + PERP_SYMBOL }))
  const onRouteChange = (e: string) => setAsset(findValueOnUrl(e, 'asset'))
  const onIsReady = ({ query }: NextRouter) => setAsset((query.asset as string) || DEFAULT_MARKET)

  useRouterEvents({ routeComplete: onRouteChange, onIsReady })
  const { loaded } = useScriptLoader({ onLoad: loadChart, src: TRADING_VIEW_SRC, enabled: !!asset })

  useEffect(() => {
    if (!asset || !loaded || !widget?.iframe) return
    widget.iframe.remove()
    loadChart()
  }, [asset])

  return (
    <Panel name="Chart" variant="secondary" {...props} ref={ref} bodyProps={{ id: container_id }} />
  )
})
