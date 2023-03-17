'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { queryClientAtom } from 'jotai-tanstack-query'
import { useHydrateAtoms } from 'jotai/utils'
// import { TranslationProvider } from '@tradex/languages'
import { PropsWithChildren, useLayoutEffect, useState } from 'react'
import { Theme } from 'utils/themeHandler'
import { IsHydratedProvider } from './IsHydratedProvider'
import { WagmiProvider } from './WagmiProvider'

export default function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())
  useHydrateAtoms([[queryClientAtom, queryClient]])

  useLayoutEffect(() => {
    const storedTheme = Theme.getStoredTheme()
    const theme = storedTheme || Theme.defaultTheme
    Theme.toDOM(theme)
  }, [])

  return (
    <IsHydratedProvider>
      <WagmiProvider>
        {/* <TranslationProvider> */}
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        {/* </TranslationProvider> */}
      </WagmiProvider>
    </IsHydratedProvider>
  )
}
