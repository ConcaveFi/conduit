import { PlusIcon } from '@tradex/icons'
import { useTranslation } from '@tradex/languages'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { UrlModal } from 'src/utils/enum/urlModal'
import { AddWidgetModal } from './AddWidgetModal'

export function AddWidgetOverlay() {
  const { t } = useTranslation()
  const router = useRouter()
  const params = useSearchParams()

  const isOpen = useMemo(() => params?.get('modal') === UrlModal.ADD_WIDGET, [params])

  const closeModal = () => {
    const newParams = (params || '')
      .toString()
      .replaceAll(new RegExp(`modal=(${UrlModal.ADD_WIDGET})`, 'g'), '')
    router.replace(`?${newParams}`)
  }

  return (
    <>
      <div className="pointer-events-none fixed flex h-screen w-full items-end justify-end p-6">
        <Link
          className="btn btn-green-gradient pointer-events-auto gap-3 rounded-full px-8 py-4 shadow-xl"
          href={`?modal=${UrlModal.ADD_WIDGET}`}
          shallow
        >
          {t('add widget')}
          <PlusIcon className="fill-ocean-900" />
        </Link>
      </div>
      <AddWidgetModal isOpen={isOpen} onClose={closeModal} />
    </>
  )
}
