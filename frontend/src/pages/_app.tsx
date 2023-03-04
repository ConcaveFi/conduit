import '@rainbow-me/rainbowkit/styles.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { TranslationProvider } from '@tradex/languages'
import { IsHydratedProvider } from 'src/context/IsHydratedProvider'
import { queryClient, WagmiProvider } from 'src/context/WagmiProvider'
import 'tailwindcss/tailwind.css'
import '../../styles/fonts.css'

// const client = new QueryClient()

export default function App({ Component, pageProps }: any) {
  return (
    <IsHydratedProvider>
      <WagmiProvider>
        <TranslationProvider>
          <QueryClientProvider client={queryClient}>
            <div className="ocean:bg-ocean-900 bg-light-300 flex h-screen overflow-y-auto overflow-x-hidden">
              <Component {...pageProps} />
            </div>
          </QueryClientProvider>
        </TranslationProvider>
      </WagmiProvider>
    </IsHydratedProvider>
  )
}
