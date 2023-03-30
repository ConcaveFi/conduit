import Head from 'next/head'

export default function Page() {
  return (
    <div>
      <Head>
        <meta name="og:title" content="Conduit profit" />
        <meta name="og:description" content="Heyy, take a look on this!" />
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
      <h1>A page with Open Graph Image.</h1>
    </div>
  )
}
