import { PlusIcon } from '@tradex/icons'
import { useTranslation } from '@tradex/languages'
import { useState } from 'react'
import { AddWidgetModal } from './AddWidgetModal'

export function AddWidgetOverlay() {
  const { t } = useTranslation()

  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <div className="pointer-events-none fixed flex h-screen w-full items-end justify-end p-6">
        <button
          onClick={() => setOpen(true)}
          className="btn btn-green-gradient centered pointer-events-auto gap-3 rounded-full px-8 py-4 shadow-xl"
        >
          {t('add widget')}
          <PlusIcon className="fill-dark-main-bg ocean:fill-blue-main-bg" />
        </button>
      </div>
      <AddWidgetModal isOpen={isOpen} onClose={() => setOpen(false)} />
    </>
  )
}
