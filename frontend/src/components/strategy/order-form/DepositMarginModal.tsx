import { sUSD_ADDRESS } from '@tradex/core'
import { Button, Modal, ModalProps, Text } from '@tradex/interface'
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
    <Modal centered column className="h-fit w-[400px]" space={'medium.eq'} {...props}>
      <Text size={'xl'} variant={'heading'}>
        Deposit Margin
      </Text>
      <CurrencyInput
        onValueChange={(v) => setValue(v.floatValue)}
        onClickBalance={(balance, decimals) => setValue(+formatUnits(balance, decimals))}
        value={value}
        currency={data}
      />
      <Button
        disabled={!value || !write}
        onClick={write}
        className="rounded-lg py-6"
        variant={'primary.outline'}
        size="xl"
      >
        {Boolean(value) && ' Confirm deposit'}
        {!Boolean(value) && 'Enter an amount'}
      </Button>
    </Modal>
  )
}
