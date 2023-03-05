import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TranslationProvider } from '@tradex/languages'
import { PropsWithChildren, useState } from 'react'
import { IsHydratedProvider } from 'src/providers/IsHydratedProvider'
import { WagmiProvider } from 'src/providers/WagmiProvider'

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30,
      },
    },
  })

export const global_queryClient = createQueryClient()

export default function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => createQueryClient())
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
