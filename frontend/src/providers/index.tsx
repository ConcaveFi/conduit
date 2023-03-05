import { QueryClientProvider } from '@tanstack/react-query'
import { TranslationProvider } from '@tradex/languages'
import { PropsWithChildren } from 'react'
import { IsHydratedProvider } from 'src/providers/IsHydratedProvider'
import { queryClient, WagmiProvider } from 'src/providers/WagmiProvider'

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <IsHydratedProvider>
      <WagmiProvider>
        <TranslationProvider>
          <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>
        </TranslationProvider>
      </WagmiProvider>
    </IsHydratedProvider>
  )
}
