import { PlusIcon } from '@tradex/icons'
import { useTranslation } from '@tradex/languages'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { AddWidgetModal } from './AddWidgetModal'

const MODAL_ADDWIDGET_QITEM = 'addWidget'
export function AddWidgetOverlay() {
  const { t } = useTranslation()
  const router = useRouter()
  const params = useSearchParams()

  const { query } = router
  function handleClick() {
    Object.assign(query, { modal: MODAL_ADDWIDGET_QITEM })
    router.replace({ query })
  }

  const isOpen = useMemo(() => params.get('modal') === MODAL_ADDWIDGET_QITEM, [params])
  const onClose = useCallback(
    () => (delete query?.modal, router.replace({ query: query })),
    [router, query],
  )

  return (
    <>
      <div className="pointer-events-none fixed flex h-screen w-full items-end justify-end p-6">
        <button
          className="btn btn-green-gradient pointer-events-auto gap-3 rounded-full px-8 py-4 shadow-xl"
          onClick={handleClick}
        >
          {t('add widget')}
          <PlusIcon className="fill-ocean-900" />
        </button>
      </div>
      <AddWidgetModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
