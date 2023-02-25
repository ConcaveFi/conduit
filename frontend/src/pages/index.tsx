import { Container } from '@tradex/interface'
import { GridLayout } from 'src/components/GridLayout'
import { StrategyHeader } from 'src/components/strategy/StrategyHeader'
import { Topbar } from 'src/components/topbar/Topbar'
import { WidgetsProvider } from 'src/context/WidgetsProvider'
import { useIsClientRendered } from 'src/hooks/useIsClientRendered'

export default function Home() {
  const isClientRendered = useIsClientRendered()
  if (!isClientRendered) return null
  return (
    <WidgetsProvider>
      <Container space="medium.eq" column className="h-full w-full">
        <Topbar />
        <StrategyHeader />
        <GridLayout />
      </Container>
    </WidgetsProvider>
  )
}
