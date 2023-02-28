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
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <Topbar />
        <StrategyHeader />
        <GridLayout />
      </div>
    </WidgetsProvider>
  )
}
