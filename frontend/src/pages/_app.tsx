import '@rainbow-me/rainbowkit/styles.css'
import AppProviders from 'src/providers'
import 'tailwindcss/tailwind.css'
import '../../styles/fonts.css'

import localFont from 'next/font/local'

const Aeonik = localFont({
  src: '../../fonts/Aeonik/Aeonik-Regular.otf',
  variable: '--font-aeonik',
})

const AeonikMono = localFont({
  src: [
    {
      path: '../../fonts/Aeonik-Mono/AeonikMono-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/Aeonik-Mono/AeonikMono-Medium.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-aeonik-mono',
})

export default function App({ Component, pageProps }: any) {
  return (
    <AppProviders>
      <div
        className={`bg-ocean-900 flex h-screen overflow-y-auto overflow-x-hidden ${Aeonik.variable} ${AeonikMono.variable} font-sans`}
      >
        <Component {...pageProps} />
      </div>
    </AppProviders>
  )
}
