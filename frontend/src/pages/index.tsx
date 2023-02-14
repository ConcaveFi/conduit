import { Container, Flex, Panel } from '@tradex/interface'
import { useEffect, useRef, useState } from 'react'
import ReactGridLayout from 'react-grid-layout'
import { ChartPanel } from 'src/components/chart/ChartPanel'
import { GridLayout } from 'src/components/GridLayout'
import { StrategyHeader } from 'src/components/strategy/StrategyHeader'
import { Topbar } from 'src/components/Topbar'
import { useIsMounted } from 'src/hooks/useIsMounted'
export default function Home() {
  const isMounted = useIsMounted()

  if (!isMounted) return <></>
  return (
    <Container space="medium.eq" column className="overflow-y-auto overflow-x-hidden">
      <Topbar />
      <StrategyHeader />
      <GridLayout />
    </Container>
  )
}
