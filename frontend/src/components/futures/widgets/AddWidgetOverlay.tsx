import { PlusIcon } from '@tradex/icons'
import { useTranslation } from '@tradex/languages'
import { useQueryModal } from 'src/utils/enum/urlModal'
import { AddWidgetModal } from './AddWidgetModal'

export function AddWidgetOverlay() {
  const { t } = useTranslation()
  const { isOpen, onClose, onOpen } = useQueryModal({ modalType: 'add_widget' })
  return (
    <>
      <div className="pointer-events-none fixed flex h-screen w-full items-end justify-end p-6">
        <button
          className="btn btn-green-gradient pointer-events-auto gap-3 rounded-full px-8 py-4 shadow-xl"
          onClick={onOpen}
        >
          {t('add widget')}
          <PlusIcon className="fill-ocean-900" />
        </button>
      </div>
      <AddWidgetModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
