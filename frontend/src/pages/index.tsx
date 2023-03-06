import Head from 'next/head'
import { useState } from 'react'
import { GridLayout } from 'src/components/GridLayout'
import { StrategyHeader } from 'src/components/strategy/StrategyHeader'
import { Topbar } from 'src/components/topbar/Topbar'
import { usePageTitleWithAssetPrice } from 'src/hooks/usePageTitleWithAssetPrice'
import { useIsHydrated } from 'src/providers/IsHydratedProvider'
import { WidgetsProvider } from 'src/providers/WidgetsProvider'

export default function Home() {
  usePageTitleWithAssetPrice()

  const isHydrated = useIsHydrated()
  const [unlocked, setUnlocked] = useState(false)

  if (!isHydrated) return null

  return (
    <>
      {!unlocked && <LockScreen onUnlock={() => setUnlocked(true)} />}
      {unlocked && (
        <WidgetsProvider>
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
      <img
        src={'/assets/conduit-bg-theme.png'}
        className="absolute h-full w-full object-cover "
        alt="logo"
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
