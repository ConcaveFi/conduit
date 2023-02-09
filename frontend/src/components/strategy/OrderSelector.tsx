import { LineGrowIcon, SailIcon } from '@tradex/icons'
import { Button } from '@tradex/interface'
import { useState } from 'react'
import { Tab } from '../TabSelector'

export function OrderTab() {
  const [tab, setTab] = useState(0)
  return (
    <Tab onChange={setTab}>
      <Tab.Button>
        {(selected) => (
          <Button variant={selected ? 'green-gradient' : 'underline.secondary'} size="xl">
            <SailIcon
              variant="mini"
              className={`w-5 h-5 ${!selected ? ' fill-ocean-300' : 'fill-ocean-900'}`}
            />
            Cross
          </Button>
        )}
      </Tab.Button>
      <Tab.Button>
        {(selected) => (
          <Button variant={selected ? 'green-gradient' : 'underline.secondary'} size="xl">
            <LineGrowIcon
              className={`w-5 h-5 ${!selected ? ' fill-ocean-300' : 'fill-ocean-900'}`}
            />
            Market
          </Button>
        )}
      </Tab.Button>
      <Tab.Button>
        {(selected) => (
          <Button variant={selected ? 'green-gradient' : 'underline.secondary'} size="xl">
            <LineGrowIcon
              className={`w-5 h-5 ${!selected ? ' fill-ocean-300' : 'fill-ocean-900'}`}
            />
            Isolated
          </Button>
        )}
      </Tab.Button>
    </Tab>
  )
}
