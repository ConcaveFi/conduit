import { GridLayout } from 'src/components/GridLayout'
import { StrategyHeader } from 'src/components/strategy/StrategyHeader'
import { Topbar } from 'src/components/topbar/Topbar'
import { useIsHydrated } from 'src/providers/IsHydratedProvider'
import { WidgetsProvider } from 'src/providers/WidgetsProvider'

export default function Home() {
  const isHydrated = useIsHydrated()

  if (!isHydrated) return null
  return (
    <WidgetsProvider>
      <div className="skeleton flex h-full w-full flex-col gap-4 p-4">
        <Topbar />
        <StrategyHeader />
        <GridLayout />
      </div>
    </WidgetsProvider>
  )
}
