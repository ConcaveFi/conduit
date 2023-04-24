'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { queryClientAtom } from 'jotai-tanstack-query'
import { useHydrateAtoms } from 'jotai/utils'
// import { TranslationProvider } from '@tradex/languages'
import { PropsWithChildren, useEffect, useLayoutEffect, useState } from 'react'
import { Theme } from 'utils/themeHandler'
import { IsHydratedProvider } from './IsHydratedProvider'
import { ThemeProvider } from './ThemeProvider'
import { TransactionsProvider } from './TransactionsProvider'
import { WagmiProvider } from './WagmiProvider'

const _useLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export default function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())
  useHydrateAtoms([[queryClientAtom, queryClient]])

  _useLayoutEffect(() => {
    const storedTheme = Theme.getStoredTheme()
    const theme = storedTheme || Theme.defaultTheme
    Theme.toDOM(theme)
  }, [])

  return (
    <>
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
    </>
  )
}
