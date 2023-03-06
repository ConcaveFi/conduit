import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TranslationProvider } from '@tradex/languages'
import { PropsWithChildren } from 'react'
import { IsHydratedProvider } from 'src/providers/IsHydratedProvider'
import { WagmiProvider } from 'src/providers/WagmiProvider'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30,
    },
  },
})

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <IsHydratedProvider>
      <WagmiProvider>
        <TranslationProvider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </TranslationProvider>
      </WagmiProvider>
    </IsHydratedProvider>
  )
}
