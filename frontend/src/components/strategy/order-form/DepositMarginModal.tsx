import { sUSD_ADDRESS } from '@tradex/core'
import { Button, Modal, ModalProps, Text } from '@tradex/interface'
import { formatUnits } from 'ethers/lib/utils'
import { useState } from 'react'
import { CurrencyInput } from 'src/components/CurrencyInput'
import { useNetwork, useToken } from 'wagmi'
import { optimismGoerli } from 'wagmi/chains'

export function DepositMarginModal(props: ModalProps) {
  const [value, setValue] = useState<number>()
  const { chain } = useNetwork()

  const address = sUSD_ADDRESS[chain?.id || optimismGoerli.id]
  const { data } = useToken({ address, enabled: Boolean(chain) })

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
      <Button disabled={!value} className="rounded-lg py-6" variant={'primary.outline'} size="xl">
        {value && ' Confirm deposit'}
        {!value && 'Enter an amount'}
      </Button>
    </Modal>
  )
}
