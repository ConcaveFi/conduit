import { PlusIcon } from '@tradex/icons'
import { Button, Container, Flex, Panel } from '@tradex/interface'
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
    <>
      <Flex className="overflow-y-auto h-screen overflow-x-hidden">
        <Container space="medium.eq" column className="w-full h-full">
          <Topbar />
          <StrategyHeader />
          <GridLayout />
        </Container>
        <Container
          expand={'all'}
          space="spacius"
          justify={'end'}
          align="end"
          className="fixed pointer-events-none"
        >
          <Button
            className="px-8 py-4 gap-3 shadow-xl pointer-events-auto"
            variant={'green-gradient'}
          >
            <PlusIcon className="fill-ocean-900" />
            Add Widget
          </Button>
        </Container>
      </Flex>
    </>
  )
}
