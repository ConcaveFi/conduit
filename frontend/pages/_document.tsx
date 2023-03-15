import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    // TEMPORALY solution to make theme always ocean.
    <Html className="ocean">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
