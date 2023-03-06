import { GridLayout } from 'src/components/GridLayout'
import { StrategyHeader } from 'src/components/strategy/StrategyHeader'
import { Topbar } from 'src/components/topbar/Topbar'
import { usePageTitleWithAssetPrice } from 'src/hooks/usePageTitleWithAssetPrice'
import { useIsHydrated } from 'src/providers/IsHydratedProvider'
import { WidgetsProvider } from 'src/providers/WidgetsProvider'

export default function Home() {
  usePageTitleWithAssetPrice()

  const isHydrated = useIsHydrated()

  if (!isHydrated) return null
  return (
    <WidgetsProvider>
      <div className="skeleton flex h-full w-full flex-col gap-2 p-2">
        <Topbar />
        <StrategyHeader />
        <GridLayout />
      </div>
    </WidgetsProvider>
  )
}
