import { Container, Flex, Panel, Text } from '@exchange/interface'
import { useEffect } from 'react'
import { NewsPanel } from 'src/components/strategy/NewsPanel'
import { OrderFormPanel } from 'src/components/strategy/OrderFormPanel'
import { RecentTradesPanel } from 'src/components/strategy/RecentTradesPanel'
import { StrategyHeader } from 'src/components/strategy/StrategyHeader'
import { Topbar } from 'src/components/Topbar'
import { useIsMounted } from 'src/hooks/useIsMounted'
export default function Home() {
  const isMounted = useIsMounted()

  useEffect(() => {
    const header = document.head
    if (document.getElementById('trading-view')) return

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://s3.tradingview.com/tv.js'
    script.id = 'trading-view'
    header.appendChild(script)

    const interval = setInterval(() => {
      if (!TradingView) return
      new TradingView.widget({
        autosize: true,
        symbol: 'BINANCE:ETHUSDT',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'br',
        toolbar_bg: '#000',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: 'chart-container',
      })
      clearInterval(interval)
    }, 1000)
  }, [])
  if (!isMounted) return <></>

  return (
    <div className="h-screen flex flex-col w-full bg-ocean-900 p-6 gap-5 overflow-auto">
      <Topbar />
      <StrategyHeader />
      <Container className="gap-4">
        <OrderFormPanel />
        <Panel
          name="Chart"
          variant="secondary"
          className="w-[60%] "
          bodyProps={{ id: 'chart-container', className: 'h-[600px]' }}
        ></Panel>
        <Flex column className="gap-4 w-w-3/12 ">
          <NewsPanel />
          <RecentTradesPanel />
        </Flex>
      </Container>
    </div>
  )
}
