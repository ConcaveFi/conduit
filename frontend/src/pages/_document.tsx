import { Html, Main, NextScript, Head } from 'next/document'

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
