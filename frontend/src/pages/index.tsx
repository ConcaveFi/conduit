import { Container, Flex, Panel, Text } from '@exchange/interface'
import { NewsPanel } from 'src/components/strategy/NewsPanel'
import { OrderFormPanel } from 'src/components/strategy/OrderFormPanel'
import { RecentTradesPanel } from 'src/components/strategy/RecentTradesPanel'
import { StrategyHeader } from 'src/components/strategy/StrategyHeader'
import { Topbar } from 'src/components/Topbar'
import { useIsMounted } from 'src/hooks/useIsMounted'
export default function Home() {
  const isMounted = useIsMounted()
  if (!isMounted) return <></>

  return (
    <div className="h-screen flex flex-col w-full bg-ocean-900 p-6 gap-5 overflow-auto">
      <Topbar />
      <StrategyHeader />
      <Container className="gap-4">
        <OrderFormPanel />
        <Panel name="Chart" variant="secondary" className="w-[60%] h-[700px]" />
        <Flex column className="gap-4 w-w-3/12 ">
          <NewsPanel />
          <RecentTradesPanel />
        </Flex>
      </Container>
    </div>
  )
}
