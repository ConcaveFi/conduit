'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { TranslationProvider } from '@tradex/languages'
import { PropsWithChildren, useState } from 'react'
import { IsHydratedProvider } from './IsHydratedProvider'
import { WagmiProvider } from './WagmiProvider'

export default function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())

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
