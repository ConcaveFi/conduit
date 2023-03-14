import { cx, Modal, ModalProps } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'
import { useReducer } from 'react'
import { useWidgets } from 'src/app/[asset]/providers/WidgetsProvider'
import { GridWidget, GridWidgets } from 'src/utils/grid/grid.widgets'
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
    addWidgets(selecteds as GridWidgets[])
    dispatch('wipe')
    props.onClose()
  }

  const notAdded = GridWidget.getDefaultWidgets().filter(
    (widget) => !widgets.includes(widget as GridWidgets),
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
        {renderNotAddedWidgets()}
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

  function renderNotAddedWidgets() {
    if (!hasWidgetsToAdd) return <span className="text-ocean-200">No more widgets to add.</span>
    return notAdded.map((key) => {
      const buttonVariant = selecteds.includes(key) ? 'btn-secondary' : 'btn-underline.secondary'
      const className = cx('btn w-fit py-2 px-5', buttonVariant)
      const onClick = () => dispatch(key)
      const buttonProps = { onClick, className }

      return (
        <button key={key} {...buttonProps}>
          {key.replace('-', ' ')}
        </button>
      )
    })
  }
}
