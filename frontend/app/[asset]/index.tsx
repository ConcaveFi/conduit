'use client'

import { WidgetsProvider } from '../providers/WidgetsProvider'
import { GridLayout } from './components/GridLayout'
import { StrategyHeader } from './components/Header'

export default function Home() {
  return (
    <WidgetsProvider>
      <StrategyHeader />
      <GridLayout />
    </WidgetsProvider>
  )
}
