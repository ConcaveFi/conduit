import { sUSD_ADDRESS } from '@tradex/core'
import { Modal, ModalProps } from '@tradex/interface'
import { formatUnits, parseEther } from 'ethers/lib/utils'
import { useMarketTransferMargin, usePrepareMarketTransferMargin } from 'perps-hooks'
import { useState } from 'react'
import { CurrencyInput } from 'src/components/CurrencyInput'
import { useRouteMarket } from 'src/pages/perps'
import { useNetwork, useToken } from 'wagmi'
import { optimismGoerli } from 'wagmi/chains'

export function DepositMarginModal(props: ModalProps) {
  const [value, setValue] = useState<number>()
  const { chain } = useNetwork()

  const address = sUSD_ADDRESS[chain?.id || optimismGoerli.id]
  const { data } = useToken({ address, enabled: Boolean(chain) })

  const market = useRouteMarket()
  const args = [parseEther(value?.toString() || '0')] as const
  const { config } = usePrepareMarketTransferMargin({ address: market?.address, args })
  const { write } = useMarketTransferMargin(config)

  return (
    <Modal className="centered card card-primary-outlined h-fit w-[400px] gap-4 p-4" {...props}>
      <span className="text-heading text-xl">Deposit Margin</span>
      <CurrencyInput
        onValueChange={(v) => setValue(v.floatValue)}
        onClickBalance={(balance, decimals) => setValue(+formatUnits(balance, decimals))}
        value={value}
        currency={data}
      />
      <button
        disabled={!value || !write}
        onClick={write}
        className="btn btn-primary.outlined centered h-14 w-full rounded-lg py-6"
      >
        {Boolean(value) && ' Confirm deposit'}
        {!Boolean(value) && 'Enter an amount'}
      </button>
    </Modal>
  )
}
