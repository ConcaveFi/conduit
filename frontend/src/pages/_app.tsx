import '@rainbow-me/rainbowkit/styles.css'
import { Flex } from '@tradex/interface'
import { ConnectWalletProvider } from 'src/context/ConnectWalletProvider'
import { WagmiProvider } from 'src/context/WagmiProvider'
import 'tailwindcss/tailwind.css'
import '../../styles/fonts.css'

export default function App({ Component, pageProps }: any) {
  return (
    <WagmiProvider>
      <ConnectWalletProvider>
        <Flex className="overflow-y-auto h-screen overflow-x-hidden">
          <Component {...pageProps} />
        </Flex>
      </ConnectWalletProvider>
    </WagmiProvider>
  )
}
