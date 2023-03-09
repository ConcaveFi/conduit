import { useRouteMarket } from 'src/perpetuals/hooks/useMarket'
import { useSkewAdjustedOffChainPrice } from 'src/perpetuals/hooks/useOffchainPrice'
import { useIsHydrated } from 'src/providers/IsHydratedProvider'

import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { GridLayout } from 'src/components/futures/GridLayout'
import { Topbar } from 'src/components/futures/topbar/Topbar'
import { StrategyHeader } from 'src/perpetuals/Header'
import { WidgetsProvider } from 'src/providers/WidgetsProvider'
import { formatUsd } from 'src/utils/format'

function Title() {
  const market = useRouteMarket()

  const { data: price } = useSkewAdjustedOffChainPrice({
    marketKey: market?.key,
    watch: true,
  })

  return (
    <Head>
      <title>
        {market && price ? `${market.asset} - ${formatUsd(price)} | Conduit` : 'Conduit'}
      </title>
    </Head>
  )
}

export default function Home() {
  const isHydrated = useIsHydrated()
  const [unlocked, setUnlocked] = useState(false)
  if (!isHydrated) return null
  return (
    <>
      {!unlocked && <LockScreen onUnlock={() => setUnlocked(true)} />}
      {unlocked && (
        <WidgetsProvider>
          <Title />
          <div className="skeleton flex h-full w-full flex-col gap-4 p-4">
            <Topbar />
            <StrategyHeader />
            <GridLayout />
          </div>
        </WidgetsProvider>
      )}
    </>
  )
}
function LockScreen(props: { onUnlock?: VoidFunction }) {
  const [value, setValue] = useState('')
  function handleUnlock() {
    if (value !== process.env.NEXT_PUBLIC_APP_SECRET) return
    props?.onUnlock?.()
  }
  return (
    <div className="centered fixed z-[100] flex h-full w-full flex-col gap-4">
      <Image
        src={'/assets/conduit-bg-theme.png'}
        className=" absolute object-cover "
        unoptimized={true}
        alt="logo"
        fill
      />

      <div className="card  bg-ocean-700 centered z-10 mt-[-400px] h-[250px] w-[400px] gap-4 bg-opacity-80 p-8 shadow-xl backdrop-blur-md">
        <span className="text-ocean-300 text-xl ">Do you know the secret, anon?</span>
        <input
          value={value}
          type="password"
          onChange={({ target }) => setValue(target.value)}
          className=" bg-ocean-900 placeholder:text-ocean-400 text-ocean-200 h-14 w-full rounded-xl px-4 shadow-lg  outline-none"
          placeholder="Enter secret"
        />
        <button onClick={handleUnlock} className="btn btn-green-gradient centered h-14 w-full">
          Submit
        </button>
      </div>
    </div>
  )
}
