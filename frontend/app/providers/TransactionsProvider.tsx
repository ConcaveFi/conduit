'use client'

import { PropsWithChildren } from 'react'

import {
  createTransactionsStore,
  ToastsViewport,
  TransactionsStoreProvider,
  TransactionStatusToastProps,
} from '@pcnv/txs-react'

import { ClassicToast } from '@pcnv/txs-react/toasts/ClassicToast'
import '@pcnv/txs-react/toasts/ClassicToast/styles.css'

const transactionsStore = createTransactionsStore()

function Toast(props: TransactionStatusToastProps) {
  return <ClassicToast colorScheme="dark" {...props} />
}

export function TransactionsProvider({ children }: PropsWithChildren) {
  return (
    <TransactionsStoreProvider store={transactionsStore}>
      <ToastsViewport TransactionStatusComponent={Toast} placement="top-end" />
      {children}
    </TransactionsStoreProvider>
  )
}
