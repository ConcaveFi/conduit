'use client'

import { Hydrate } from '@tanstack/react-query'
import { deserialize } from 'superjson'
import { SuperJSONResult } from 'superjson/dist/types'
import { WidgetsProvider } from '../providers/WidgetsProvider'
import { GridLayout } from './components/GridLayout'
import { StrategyHeader } from './components/Header'

export default function Home({ dehydratedState }: { dehydratedState: SuperJSONResult }) {
  const state = deserialize(dehydratedState)

  // const a = useIsHydrated()
  // if (!a) return null

  return (
    <Hydrate state={state}>
      <WidgetsProvider>
        <StrategyHeader />
        <GridLayout />
      </WidgetsProvider>
    </Hydrate>
  )
}
