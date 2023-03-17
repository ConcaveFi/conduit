import '@rainbow-me/rainbowkit/styles.css'
import localFont from 'next/font/local'
import { PropsWithChildren } from 'react'
import 'tailwindcss/tailwind.css'
import '../global.css'
import AppProviders from './providers'

const sans = localFont({
  src: [
    {
      path: '../public/assets/fonts/Aeonik/Aeonik-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/Aeonik/Aeonik-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/Aeonik/Aeonik-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
})

const mono = localFont({
  src: [
    {
      path: '../public/assets/fonts/Aeonik-Mono/AeonikMono-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/Aeonik-Mono/AeonikMono-Medium.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
})

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      className={`bg-ocean-900 flex h-screen overflow-y-auto overflow-x-hidden font-sans ${sans.variable} ${mono.variable}`}
    >
      <body className="w-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Conduit',
  description: 'Onchain perpetuals',
}
