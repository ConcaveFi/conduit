'use client'

import { Hydrate } from '@tanstack/react-query'
import { deserialize } from 'superjson'
import { SuperJSONResult } from 'superjson/dist/types'
import { GridLayout } from './components/GridLayout'
import { StrategyHeader } from './components/Header'
import { WidgetsProvider } from './providers/WidgetsProvider'

export default function Home({ dehydratedState }: { dehydratedState: SuperJSONResult }) {
  const state = deserialize(dehydratedState)

  return (
    <Hydrate state={state}>
      <WidgetsProvider>
        <StrategyHeader />
        <GridLayout />
      </WidgetsProvider>
    </Hydrate>
  )
}
