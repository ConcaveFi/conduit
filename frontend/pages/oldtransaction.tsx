import Head from 'next/head'
import { NextRequest } from 'next/server'

export default function Page(req: NextRequest) {
  // const { searchParams } = new URL(req.url)
  // const profit = searchParams.get('profit') || '0'
  // const leverage = searchParams.get('leverage') || '0'
  // const asset = searchParams.get('asset') || 'eth'
  // const type = searchParams.get('type') || 'short'
  return (
    <div>
      <Head>
        <meta name="og:title" content="Conduit profit" />
        <meta name="og:description" content="Take a " />
        <meta
          name="og:image"
          content={
            // Because OG images must have a absolute URL, we use the
            // `VERCEL_URL` environment variable to get the deployment’s URL.
            // More info:
            // https://vercel.com/docs/concepts/projects/environment-variables
            `${
              process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
            }/api/profit?profit=2.12&leverage=23.1&asset=btc&type=long`
          }
        />
      </Head>
      <h1>WIP </h1>
    </div>
  )
}
