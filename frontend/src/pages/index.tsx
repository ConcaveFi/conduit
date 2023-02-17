import { Container, Flex } from '@tradex/interface'
import { useRouter } from 'next/router'
import { GridLayout } from 'src/components/GridLayout'
import { StrategyHeader } from 'src/components/strategy/StrategyHeader'
import { Topbar } from 'src/components/Topbar'
import { WidgetsProvider } from 'src/context/WidgetsProvider'
import { useIsMounted } from 'src/hooks/useIsMounted'

export default function Home() {
  const isMounted = useIsMounted()
  if (!isMounted) return <></>
  return (
    <WidgetsProvider>
      <Container space="medium.eq" column className="w-full h-full">
        <Topbar />
        <StrategyHeader />
        <GridLayout />
      </Container>
    </WidgetsProvider>
  )
}
