import { Button, CheckBox, Flex, Modal, ModalProps, Text } from '@tradex/interface'
import { useReducer } from 'react'
import { useWidgets } from 'src/context/WidgetsProvider'
import { GridWidgetKeys, GRID_WIDGETS } from 'src/utils/gridWidgets'
import { OrderFormPanel } from '../strategy/OrderFormPanel'

function reducer(state: string[], action: string) {
  if (action === 'wipe') return []
  if (state.includes(action)) return state.filter((widget) => widget !== action)
  return [...state, action]
}
export function AddWidgetModal(props: ModalProps) {
  const { widgets, addWidgets } = useWidgets()
  const [selecteds, dispatch] = useReducer(reducer, [])
  function handleApply() {
    addWidgets(selecteds as GridWidgetKeys[])
    dispatch('wipe')
    props.onClose()
  }

  return (
    <Modal {...props} column overlay space={'medium.eq'} className="w-[400px] h-[300px] ">
      <Flex column>
        <Text className="mx-auto" variant={'heading'} size="2xl">
          Add widget
        </Text>
        <Text variant={'low'} className="px-12">
          These are the widgets not included on your layout
        </Text>
      </Flex>
      <Flex grow className="flex-wrap w-full gap-4 bg-ocean-900 rounded-xl py-3" centered>
        {Object.keys(GRID_WIDGETS)
          .filter((widget) => !widgets.includes(widget as GridWidgetKeys))
          .map((key) => (
            <Button
              key={key}
              variant={selecteds.includes(key) ? 'primary' : 'underline.secondary'}
              onClick={() => dispatch(key)}
              className="py-2"
              size="md"
            >
              {key.replace('-', ' ')}
            </Button>
          ))}
      </Flex>
      <Flex className=" gap-3" justify={'end'}>
        <Button className="bg-ocean-500 w-[80px] h-9 rounded-lg ">
          <Text variant={'heading'}>Cancel</Text>
        </Button>
        <Button onClick={handleApply} className="bg-green-gradient w-[80px] h-9 rounded-lg">
          Apply
        </Button>
      </Flex>
    </Modal>
  )
}
