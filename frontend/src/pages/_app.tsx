import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import '../../styles/fonts.css'

export default function App({ Component, pageProps }: any) {
  return <Component {...pageProps} />
}
