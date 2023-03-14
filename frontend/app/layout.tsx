import '@rainbow-me/rainbowkit/styles.css'
import { PropsWithChildren } from 'react'
import 'tailwindcss/tailwind.css'
import '../global.css'

import localFont from 'next/font/local'

const Aeonik = localFont({
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
  variable: '--font-aeonik',
})

const AeonikMono = localFont({
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
  variable: '--font-aeonik-mono',
})

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      className={`bg-ocean-900 ocean flex h-screen overflow-y-auto overflow-x-hidden font-sans ${Aeonik.variable} ${AeonikMono.variable}`}
    >
      <body className="w-full">{children}</body>
    </html>
  )
}

export const metadata = {
  title: 'Conduit',
  description: 'Onchain perpetuals',
}
