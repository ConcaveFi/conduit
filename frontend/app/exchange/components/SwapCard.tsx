'use client'

import { Currency, CurrencyAmount, ETH_ADDRESS, Exchange } from '@tradex/core'
import { CloseIcon, Spinner } from '@tradex/icons'
import { Card, Modal } from '@tradex/interface'
import { prepareWriteContract, readContract, writeContract } from '@wagmi/core'
import { BigNumber, ethers } from 'ethers'
import useDebounce from 'hooks/useDebounce'
import { useDisclosure } from 'hooks/useDisclosure'
import { useEffect, useState } from 'react'
import { useAccount, useBalance, useQuery, useSigner } from 'wagmi'
import { ConfirmTransaction } from './ConfirmSwap'
import { SwapInput, useExchangeInput } from './CurrencyInput'
import { DoneTransaction } from './DoneTransaction'
import { SwapButton } from './SwapButton'
import { SwapDivisor } from './SwapDivisor'
import { useCurrencyAmount } from './useCurrencyAmount'

const DEFAULT_1 = {
  address: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  decimals: 18,
  logoURI: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=010',
  name: 'DAI',
  value: BigNumber.from(0),
  symbol: 'DAI',
} satisfies CurrencyAmount

const DEFAULT_2 = {
  address: `0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9`,
  symbol: `sUSD`,
  decimals: 18,
  value: BigNumber.from(0),
  logoURI: 'https://tokens.1inch.io/0x57ab1ec28d129707052df4df418d58a2d46d5f51.png',
  name: 'Synth sUSD',
} satisfies CurrencyAmount
const exchange = new Exchange({ chainId: 10 })

export const useSwap = () => {
  const signer = useSigner()
  const amountIn = useCurrencyAmount({ currency: DEFAULT_1 })
  const amountOut = useCurrencyAmount({ currency: DEFAULT_2 })
  const account = useAccount()

  const inputIn = useExchangeInput({
    currency: amountIn,
    setCurrency: (currency: Currency) => {
      amountIn.setFormattedValue('')
      amountOut.setFormattedValue('')
      amountIn.setCurrency(currency)
    },
    setFormattedValue: amountIn.setFormattedValue,
  })

  const inputOut = useExchangeInput({
    currency: amountOut,
    setCurrency: (currency: Currency) => {
      amountIn.setFormattedValue('')
      amountOut.setFormattedValue('')
      amountOut.setCurrency(currency)
    },
    setFormattedValue: amountOut.setFormattedValue,
  })

  const balanceIn = useBalance({
    address: account.address,
    token: amountIn.address !== ETH_ADDRESS ? amountIn.address : undefined,
  })

  const balanceOut = useBalance({
    address: account.address,
    token: amountOut.address !== ETH_ADDRESS ? amountIn.address : undefined,
  })

  const maxIn = () => {
    if (!balanceIn.data?.value) return
    amountIn.setValue(balanceIn.data.value)
  }

  const debounceKey = useDebounce(
    [amountIn?.symbol, amountIn?.symbol, amountIn?.value.toString()].filter((v) => v).join('-'),
    300,
  )
  const { error, ...quoteInfo } = useQuery(['QUOTE', debounceKey], async () => {
    if (amountIn.value.lte(0)) {
      return BigNumber.from(0)
    }

    const result = await exchange.quote({
      baseCurrency: amountIn,
      quoteCurrency: amountOut,
    })
    return result.value
  })

  useEffect(() => {
    if (quoteInfo.data) amountOut.setValue(quoteInfo.data)
  }, [quoteInfo.data, amountOut])
  const swapCurrencies = () => {
    const inputOld = amountIn
    const outputOld = amountOut
    inputIn.setCurrency(outputOld)
    inputOut.setCurrency(inputOld)
  }

  const spender = useQuery(
    ['SPENDER', debounceKey],
    async () =>
      exchange.fetchSpender({
        baseCurrency: amountIn,
        quoteCurrency: amountOut,
      }),
    {
      enabled: amountIn.value.gt(0) && !!signer.data,
    },
  )

  const allowance = useQuery(
    ['ALLOWANCE', account.address, amountIn.value.toString(), spender.data],
    async () => {
      return readContract({
        address: amountIn.address,
        abi: ['function allowance(address owner, address spender) view returns (uint256)'],
        functionName: 'allowance',
        args: [account.address, spender.data],
      }) as Promise<BigNumber>
    },
    { enabled: !!spender.data && !!account.address },
  )

  const allow = useQuery(
    ['ALLOW', allowance.data, account.address, amountIn.address, amountIn.value.toString()],
    async () => {
      if (amountIn.value.eq(0)) return ''
      if (!allowance.data) return ''

      const amount = amountIn.value
      if (allowance.data.gt(amount)) return ''

      const prepare = await prepareWriteContract({
        abi: ['function approve(address spender, uint256 amount) returns (bool)'],
        address: amountIn.address,
        functionName: 'approve',
        args: [spender.data, ethers.constants.MaxInt256],
      })
      const ignoreReject = (e: unknown) => {
        if (e?.['cause']?.['code'] !== 4001) throw e
      }
      return async () => writeContract(prepare).catch(ignoreReject)
    },
    { enabled: !!allowance.data && amountIn.value.gt(0) },
  )
  const [tx, setTx] = useState<ethers.providers.TransactionResponse>()
  const confirmModal = useDisclosure()

  const doSwap = async () => {
    if (!signer.data) throw { message: 'no signer' }
    const swap = await exchange.buildSwapArgs({
      baseCurrency: amountIn,
      quoteCurrency: amountOut,
      signer: signer.data,
    })
    const { from, to, data, value } = swap.data.tx
    confirmModal.onOpen()
    const tx = await signer.data.sendTransaction({ from, to, data, value })
    setTx(tx)
  }

  return {
    tx,
    setTx,
    error: error as { message: string },
    allow,
    confirmModal,
    balanceIn,
    amountIn,
    amountOut,
    balanceOut,
    quoteInfo,
    inputIn,
    inputOut,
    swapCurrencies,
    maxIn,
    doSwap,
    spender,
  }
}

export const ExchangeCard = () => {
  const swapState = useSwap()
  const { inputIn, inputOut, maxIn, error, quoteInfo, swapCurrencies } = swapState
  return (
    <div className="flex gap-2">
      <Card className="w-auto gap-2 rounded-3xl px-5 py-4">
        <SwapInput
          {...inputIn}
          label={'From'}
          right={(prop) => {
            return (
              <button className="text-dark-30 ocean:text-blue-30 font-bold" onClick={maxIn}>
                MAX
              </button>
            )
          }}
        >
          <SwapDivisor onClick={swapCurrencies} />
        </SwapInput>

        <SwapInput
          {...inputOut}
          disabled={true}
          label={'To'}
          right={quoteInfo.isFetching ? Spinner : error ? CloseIcon : undefined}
        />
        <SwapButton {...swapState} />
      </Card>
      <Modal isOpen={swapState.confirmModal.isOpen} onClose={swapState.confirmModal.onClose}>
        {!swapState.tx && (
          <ConfirmTransaction {...swapState} onClose={swapState.confirmModal.onClose} />
        )}
        {swapState.tx && (
          <DoneTransaction tx={swapState.tx} onClose={swapState.confirmModal.onClose} />
        )}
      </Modal>
    </div>
  )
}
