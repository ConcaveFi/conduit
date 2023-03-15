import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type WidgetModal = {
  modalType: `add_widget`
}

type SwapModal = {
  modalType: `swap`
}

type Margin = {
  modalType: `margin`
  type: 'withdraw' | 'transfer'
}

type QueryModal = WidgetModal | SwapModal | Margin

export const useQueryModal = <T extends QueryModal>({ modalType, ...others }: T) => {
  const router = useRouter()
  const query = useSearchParams()
  const isOpen = modalType === query?.get('modalType')
  const keys = Object.keys({ modalType, ...others } || {})

  const pathname = usePathname()

  const onOpen = () => {
    console.log('open', modalType)
    const newQuery = Object.entries({ ...others, modalType } || {}).reduce(
      (prev, [key, value]) => {
        if (!keys.includes(key)) return prev
        return { ...prev, [key]: value }
      },
      { modalType },
    )
    router.replace(`${pathname}?modalType=${newQuery.modalType}`)
  }

  const onClose = () => {
    // const newQuery = Object.entries(query || {}).reduce((prev, [key, value]) => {
    //   if (keys.includes(key)) return prev
    //   return { ...prev, [key]: value }
    // }, {})
    router.replace(`${pathname}`)
  }
  return { isOpen, onClose, query, onOpen }
}
