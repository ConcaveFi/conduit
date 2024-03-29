import '@rainbow-me/rainbowkit/styles.css'
import localFont from 'next/font/local'
import Script from 'next/script'
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
      className={` flex h-screen overflow-y-auto overflow-x-hidden font-sans ${sans.variable} ${mono.variable}`}
    >
      <head>
        <Script
          id="tag-manager"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-NE1K73QGNY"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-NE1K73QGNY');
        `}
        </Script>
      </head>
      <body className="bg-dark-main-bg ocean:bg-blue-main-bg w-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Conduit',
  description: 'Onchain perpetuals',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
  },
}
