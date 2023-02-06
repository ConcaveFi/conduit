import { WagmiProvider } from 'src/context/WagmiProvider'
import 'tailwindcss/tailwind.css'
import '../../styles/fonts.css'

export default function App({ Component, pageProps }: any) {
  return (
    <WagmiProvider>
      <Component {...pageProps} />
    </WagmiProvider>
  )
}
