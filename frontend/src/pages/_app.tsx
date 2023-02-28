import '@rainbow-me/rainbowkit/styles.css'
import { TranslationProvider } from '@tradex/languages'
import { QueryClient, QueryClientProvider } from 'react-query'
import { WagmiProvider } from 'src/context/WagmiProvider'
import 'tailwindcss/tailwind.css'
import '../../styles/fonts.css'

const client = new QueryClient()

export default function App({ Component, pageProps }: any) {
  return (
    <WagmiProvider>
      <TranslationProvider>
        <QueryClientProvider client={client}>
          <div className="ocean:bg-ocean-900 bg-light-300 flex h-screen overflow-y-auto overflow-x-hidden">
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </TranslationProvider>
    </WagmiProvider>
  )
}
