import '@rainbow-me/rainbowkit/styles.css'
import AppProviders from 'src/providers'
import 'tailwindcss/tailwind.css'
import '../../styles/fonts.css'

export default function App({ Component, pageProps }: any) {
  return (
    <AppProviders>
      <div className="bg-ocean-900 flex h-screen overflow-y-auto overflow-x-hidden">
        <Component {...pageProps} />
      </div>
    </AppProviders>
  )
}
