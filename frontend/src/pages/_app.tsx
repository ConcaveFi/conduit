import '@rainbow-me/rainbowkit/styles.css'
import { Metadata } from 'src/components/Metadata'
import AppProviders from 'src/providers'
import 'tailwindcss/tailwind.css'
import '../../styles/fonts.css'

export default function App({ Component, pageProps }: any) {
  return (
    <AppProviders>
      <Metadata />
      <div className="bg-main-bg flex h-screen overflow-y-auto overflow-x-hidden">
        <Component {...pageProps} />
      </div>
    </AppProviders>
  )
}
