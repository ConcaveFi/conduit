import { Modal, ModalProps, Text } from '@tradex/interface'
import { useReducer } from 'react'
import { useWidgets } from 'src/context/WidgetsProvider'
import { GridWidgetKeys, GRID_WIDGETS } from 'src/utils/gridWidgets'

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
    <Modal {...props} column overlay space={'medium.eq'} className="h-[300px] w-[400px] ">
      <div className="flex flex-col">
        <Text className="mx-auto" variant={'heading'} size="2xl">
          Add widget
        </Text>
        <Text variant={'low'} className="px-12">
          These are the widgets not included on your layout
        </Text>
      </div>
      <div className="bg-ocean-900 flex w-full flex-1 flex-col flex-wrap gap-4 rounded-xl py-3">
        {Object.keys(GRID_WIDGETS)
          .filter((widget) => !widgets.includes(widget as GridWidgetKeys))
          .map((key) => (
            <button
              key={key}
              onClick={() => dispatch(key)}
              className={`btn py-2 ${
                selecteds.includes(key) ? 'btn-primary' : 'btn-underline.secondary'
              }`}
            >
              {key.replace('-', ' ')}
            </button>
          ))}
      </div>
      <div className="flex justify-end gap-3">
        <button className="bg-ocean-500 h-9 w-[80px] rounded-lg ">
          <Text variant={'heading'}>Cancel</Text>
        </button>
        <button onClick={handleApply} className="bg-green-gradient h-9 w-[80px] rounded-lg">
          Apply
        </button>
      </div>
    </Modal>
  )
}
