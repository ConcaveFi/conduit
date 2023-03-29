'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { queryClientAtom } from 'jotai-tanstack-query'
import { useHydrateAtoms } from 'jotai/utils'
import Image from 'next/image'
// import { TranslationProvider } from '@tradex/languages'
import { PropsWithChildren, useEffect, useLayoutEffect, useState } from 'react'
import { Theme } from 'utils/themeHandler'
import { IsHydratedProvider } from './IsHydratedProvider'
import { ThemeProvider } from './ThemeProvider'
import { TransactionsProvider } from './TransactionsProvider'
import { WagmiProvider } from './WagmiProvider'

const _useLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export default function AppProviders({ children }: PropsWithChildren) {
  const [unlocked, setUnlocked] = useState(false)
  const [queryClient] = useState(() => new QueryClient())
  useHydrateAtoms([[queryClientAtom, queryClient]])

  _useLayoutEffect(() => {
    const storedTheme = Theme.getStoredTheme()
    const theme = storedTheme || Theme.defaultTheme
    Theme.toDOM(theme)
  }, [])

  return (
    <>
      {!unlocked && <LockScreen onUnlock={() => setUnlocked(true)} />}
      {unlocked && (
        <IsHydratedProvider>
          <WagmiProvider>
            {/* <TranslationProvider> */}
            <QueryClientProvider client={queryClient}>
              <ThemeProvider>
                <TransactionsProvider>{children}</TransactionsProvider>
              </ThemeProvider>
            </QueryClientProvider>
            {/* </TranslationProvider> */}
          </WagmiProvider>
        </IsHydratedProvider>
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

      <div className="card  bg-blue-20 centered z-10 mt-[-400px] h-[250px] w-[400px] gap-4 bg-opacity-80 p-8 shadow-xl backdrop-blur-md">
        <span className="text-blue-accent text-xl ">Do you know the secret, anon?</span>
        <input
          value={value}
          type="password"
          onChange={({ target }) => setValue(target.value)}
          className=" bg-blue-10 placeholder:text-blue-30 text-blue-accent h-14 w-full rounded-xl px-4 shadow-lg  outline-none"
          placeholder="Enter secret"
        />
        <button onClick={handleUnlock} className="btn btn-green-gradient centered h-14 w-full">
          Submit
        </button>
      </div>
    </div>
  )
}
