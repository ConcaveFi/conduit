import '@rainbow-me/rainbowkit/styles.css'
import AppProviders from 'src/providers'
import 'tailwindcss/tailwind.css'
import '../../styles/fonts.css'

import localFont from 'next/font/local'

const Aeonik = localFont({
  src: '../../fonts/Aeonik/Aeonik-Regular.otf',
  variable: '--font-aeonik',
})

export default function App({ Component, pageProps }: any) {
  return (
    <AppProviders>
      <div
        className={`bg-ocean-900 flex h-screen overflow-y-auto overflow-x-hidden ${Aeonik.variable} font-sans`}
      >
        <Component {...pageProps} />
      </div>
    </AppProviders>
  )
}
