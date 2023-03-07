import { GridLayout } from 'src/components/GridLayout'
import { Topbar } from 'src/components/topbar/Topbar'
import { usePageTitleWithAssetPrice } from 'src/hooks/usePageTitleWithAssetPrice'
import { StrategyHeader } from 'src/perpetuals/Header'
import { useIsHydrated } from 'src/providers/IsHydratedProvider'
import { WidgetsProvider } from 'src/providers/WidgetsProvider'

export default function Home() {
  usePageTitleWithAssetPrice()

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
