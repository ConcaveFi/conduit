import '@rainbow-me/rainbowkit/styles.css'
import { Flex } from '@tradex/interface'
import { TranslationProvider } from '@tradex/languages'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ConnectWalletProvider } from 'src/context/ConnectWalletProvider'
import { WagmiProvider } from 'src/context/WagmiProvider'
import 'tailwindcss/tailwind.css'
import '../../styles/fonts.css'

const client = new QueryClient()

export default function App({ Component, pageProps }: any) {
  return (
    <WagmiProvider>
      <ConnectWalletProvider>
        <TranslationProvider>
          <QueryClientProvider client={client}>
            <Flex className="overflow-y-auto h-screen overflow-x-hidden">
              <Component {...pageProps} />
            </Flex>
          </QueryClientProvider>
        </TranslationProvider>
      </ConnectWalletProvider>
    </WagmiProvider>
  )
}
