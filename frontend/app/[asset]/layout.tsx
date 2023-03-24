import { dehydrate } from '@tanstack/query-core'
import { optimism } from '@wagmi/core/chains'
import { PropsWithChildren } from 'react'
import { serialize } from 'superjson'
import { ReactQueryHydrate } from './HydrateProviders'
import { PageTitleWithPrice } from './PageTitleWithPrice'
import { Sidebar } from './components/sidebar/Sidebar'
import { Topbar } from './components/topbar/Topbar'
import { marketsQueryKey } from './lib/market/markets'
import { getAllMarkets, getQueryClient } from './server-only'

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(marketsQueryKey(optimism.id), () => getAllMarkets(optimism.id))
  const dehydratedState = dehydrate(queryClient)

  // next can't serialize bigints,
  // this lib seens cool https://www.npmjs.com/package/next-superjson-plugin
  // but adding the swcPlugin breaks dev mode, TODO: circle back later
  const serializedDehydratedState = serialize(dehydratedState)

  return (
    <ReactQueryHydrate dehydratedState={serializedDehydratedState}>
      <PageTitleWithPrice />
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <Sidebar />
        <Topbar />
      </div>
    </ReactQueryHydrate>
  )
}
