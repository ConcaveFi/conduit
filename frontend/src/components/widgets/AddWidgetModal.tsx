import { cx, Modal, ModalProps } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { useReducer } from 'react'
import { useWidgets } from 'src/providers/WidgetsProvider'
import { GridWidgetKeys, GRID_WIDGETS } from 'src/utils/gridWidgets'

function reducer(state: string[], action: string) {
  if (action === 'wipe') return []
  if (state.includes(action)) return state.filter((widget) => widget !== action)
  return [...state, action]
}
export function AddWidgetModal(props: ModalProps) {
  const { widgets, addWidgets } = useWidgets()
  const [selecteds, dispatch] = useReducer(reducer, [])
  const { t } = useTranslation()
  function handleApply() {
    addWidgets(selecteds as GridWidgetKeys[])
    dispatch('wipe')
    props.onClose()
  }

  const notAdded = Object.keys(GRID_WIDGETS).filter(
    (widget) => !widgets.includes(widget as GridWidgetKeys),
  )
  const hasWidgetsToAdd = notAdded.length > 0
  return (
    <Modal
      {...props}
      overlay
      className="card card-primary h-fit min-h-[300px] w-[400px] gap-4 p-5 "
    >
      <span className="text-light-400 ocean:text-ocean-200 mx-auto text-2xl font-medium">
        {t('add widget')}
      </span>

      <div className="centered flex w-full flex-1 flex-col flex-wrap gap-4 rounded-xl py-3">
        {!hasWidgetsToAdd && <span className="text-ocean-200">No more widgets to add.</span>}
        {hasWidgetsToAdd &&
          notAdded.map((key) => (
            <button
              key={key}
              onClick={() => dispatch(key)}
              className={cx(
                'btn w-fit py-2 px-5',
                selecteds.includes(key) ? 'btn-secondary' : 'btn-underline.secondary',
              )}
            >
              {key.replace('-', ' ')}
            </button>
          ))}
      </div>
      <div className="flex justify-end gap-3">
        <button className="btn btn-secondary centered h-9 w-[80px] rounded-lg ">
          <span className="text-heading" onClick={props.onClose}>
            Cancel
          </span>
        </button>
        <button onClick={handleApply} className="bg-green-gradient h-9 w-[80px] rounded-lg">
          Apply
        </button>
      </div>
    </Modal>
  )
}
