import { Container } from '@tradex/interface'
import { GridLayout } from 'src/components/GridLayout'
import { StrategyHeader } from 'src/components/strategy/StrategyHeader'
import { Topbar } from 'src/components/topbar/Topbar'
import { WidgetsProvider } from 'src/context/WidgetsProvider'
import { useIsMounted } from 'src/hooks/useIsMounted'
import { useAccount, useToken } from 'wagmi'

export default function Home() {
  const { address } = useAccount()
  // const { data } = useBalance({ address })

  const { data } = useToken({ address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000' })
  console.log(data)

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
