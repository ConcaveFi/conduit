import Head from 'next/head'
import { ProfitCard } from './transactioncard'

export default async function Page({ searchParams }) {
  const { profit, leverage, asset, type } = searchParams
  const search = new URLSearchParams({ profit, leverage, asset, type })
  return (
    <>
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
            }/api/profit?${search.toString()}`
          }
        />
      </Head>
      <div className="font-mono">
        <ProfitCard
          profit={profit}
          leverage={leverage}
          domain={'http://localhost:3000/'}
          asset={asset}
          type={type}
        />
      </div>
    </>
  )
}
