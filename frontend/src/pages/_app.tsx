import type { AppProps } from 'next/app'
import { WagmiProvider } from 'src/context/WagmiProvider'
import { useIsMounted } from 'src/hooks/useIsMounted'
import 'tailwindcss/tailwind.css'
import '../../styles/fonts.css'

export default function App({ Component, pageProps }: any) {
  const isMounted = useIsMounted()
  if (!isMounted) return <></>
  return (
    <WagmiProvider>
      <Component {...pageProps} />
    </WagmiProvider>
  )
}
