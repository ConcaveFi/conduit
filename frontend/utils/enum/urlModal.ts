import { useRouter } from "next/router"
import { Address, useQuery } from "wagmi"

type WidgetModal = {
  modalType: `add_widget`,
}

type SwapModal = {
  modalType: `swap`,
}

type Margin = {
  modalType: `margin`,
  type: 'withdraw' | 'transfer'
}

type QueryModal = WidgetModal | SwapModal | Margin


export const useQueryModal = <T extends QueryModal>({ modalType, ...others }: T) => {
  const router = useRouter()
  const { data: query, ...state } = useQueryParams<T>({})
  const isOpen = modalType === query?.modalType
  const keys = Object.keys({ modalType, ...others } || {})

  const onOpen = () => {
    console.log('open', modalType)
    const newQuery = Object.entries({ ...others, modalType } || {}).reduce((prev, [key, value]) => {
      if (!keys.includes(key)) return prev
      return { ...prev, [key]: value }
    }, { modalType })
    router.push({ query: newQuery })
  }

  const onClose = () => {
    const newQuery = Object.entries(query || {}).reduce((prev, [key, value]) => {
      if (keys.includes(key)) return prev
      return { ...prev, [key]: value }
    }, {})
    router.push({ query: newQuery })
  }
  return { isOpen, onClose, query, onOpen }
}


export const useQueryParams = <T>(def?: Partial<T>) => {
  const router = useRouter()
  const query = router.isReady ? router.query : def || {}
  return useQuery(['queryParams', JSON.stringify(query)], async () => query || {} as Partial<T>, {
    enabled: router.isReady,
  })
}
