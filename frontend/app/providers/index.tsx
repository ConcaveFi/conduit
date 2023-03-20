'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { TranslationProvider } from '@tradex/languages'
import { PropsWithChildren, useState } from 'react'
import { IsHydratedProvider } from './IsHydratedProvider'
import { ThemeProvider } from './ThemeProvider'
import { WagmiProvider } from './WagmiProvider'

export default function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <IsHydratedProvider>
      <WagmiProvider>
        {/* <TranslationProvider> */}
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryClientProvider>
        {/* </TranslationProvider> */}
      </WagmiProvider>
    </IsHydratedProvider>
  )
}
