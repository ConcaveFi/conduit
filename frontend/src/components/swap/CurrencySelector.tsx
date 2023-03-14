import { useQuery } from '@tanstack/react-query'
import { Currency, ETH_ADDRESS, Exchange, Token } from '@tradex/core'
import { ChevronIcon, SearchIcon, Spinner } from '@tradex/icons'
import { Avatar, Card, ImageIcon, Input, Modal, ModalHeader } from '@tradex/interface'
import { useEffect, useState } from 'react'
import { useDisclosure } from 'src/hooks/useDisclosure'
import { useAccount, useBalance, useChainId } from 'wagmi'
import { fetchBalance } from '@wagmi/core'
import { BigNumber } from 'ethers'
import { compactFormat } from 'src/utils/format'
import { useCoingeckoPrice } from './useCoingeckoPrice'
import { parseUnits } from 'ethers/lib/utils'

type CoinBalance = Token & { balance: BigNumber }

const useCurrencySelector = () => {
  const chainId = useChainId()
  const [search, setSearch] = useState('')
  const account = useAccount()

  const { data: tokensData, ...tokensQuery } = useQuery(['tokens', chainId], async () => {
    const { tokens } = await new Exchange({ chainId }).listTokens()

    const userTokensPromise = await Promise.all(
      tokens.map(async (token) => {
        if (!account.address) {
          return { ...token, balance: BigNumber.from(0) }
        }
        const { value } = await fetchBalance({
          address: account.address,
          token: token.address === ETH_ADDRESS ? undefined : token.address,
        })
        return { ...token, balance: value } as CoinBalance
      }),
    )
    return userTokensPromise.sort((a, b) => (a.balance.lt(b.balance) ? 1 : -1))
  })
  const tokens = tokensData || []

  return {
    ...tokensQuery,
    search,
    setSearch,
    tokens: !search
      ? tokens
      : tokens.filter((token) => {
          return (
            token.address.toLowerCase().includes(search) ||
            token.symbol.toLowerCase().includes(search) ||
            token.name.toLowerCase().includes(search)
          )
        }),
  }
}

export function CurrencySelector({
  currency,
  onSelect,
}: {
  currency: Currency
  disabled?: boolean
  onSelect: (token: Currency) => void
}) {
  const account = useAccount()
  const { data, isError, isLoading } = useBalance({
    address: account.address,
    token: currency.address === ETH_ADDRESS ? undefined : currency.address,
  })
  const [balance, setBalance] = useState<BigNumber>()
  useEffect(() => {
    if (!data) return
    setBalance(data.value)
  }, [data])
  const modalProps = useDisclosure()

  return (
    <>
      <div className="flex h-full flex-col justify-end">
        <div
          onClick={() => modalProps.onOpen()}
          className="hover:bg-Blue/main-dim flex w-44 cursor-pointer gap-2 rounded-full bg-[#082652] bg-opacity-50 p-2"
        >
          <Avatar variant={'icon'} size="sm">
            <ImageIcon src={currency.logoURI} />
          </Avatar>

          <span className="text-blue-blue mr-auto text-sm">{currency.symbol}</span>
          <div className="flex flex-col justify-center">
            <ChevronIcon className="fill-ocean-200 h-3 w-3" />
          </div>
        </div>
        <div className="text-Blue/main-dim text-sm flex w-full justify-between px-2">
          Balance
          <div className="text-blue-blue text-sm">
            {compactFormat(balance || BigNumber.from(0))}
          </div>
        </div>
        <Modal onClose={modalProps.onClose} isOpen={modalProps.isOpen}>
          <SelectTokenCard
            onClose={modalProps.onClose}
            onSelect={(c) => {
              onSelect(c)
              modalProps.onClose()
            }}
          />
        </Modal>
      </div>
    </>
  )
}

const SelectTokenCard = ({
  onClose,
  onSelect,
}: {
  onClose: () => void
  onSelect: (token: Currency) => void
}) => {
  const { tokens, isLoading, search, setSearch } = useCurrencySelector()

  return (
    <Card className="w-80 gap-2 ">
      <ModalHeader message={'Search Token'} onClose={onClose} />
      <Input
        placeholder={'Search Token'}
        value={search}
        variant={'primary'}
        onChange={({ target }) => {
          setSearch(target.value)
        }}
        left={SearchIcon}
      />
      <div className="flex justify-between p-2">
        <p className="text-blue-blue text-md">Tokens</p>
        <p className="text-blue-blue text-md">Holdings</p>
      </div>
      <div className=" flex flex-col h-96 overflow-y-auto">
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <Spinner className={'w-8 h-8'} />
          </div>
        )}
        {tokens.map((c, i) => (
          <TokenItem
            onSelect={(c) => {
              onSelect(c)
            }}
            key={c.symbol}
            {...c}
          />
        ))}
      </div>
    </Card>
  )
}

const TokenItem = ({
  onSelect,
  ...token
}: CoinBalance & {
  onSelect: (c: Token) => void
}) => {
  const chainId = useChainId()
  const price = useCoingeckoPrice({
    contractAddress: token.address,
    chainId,
    enabled: token.balance.gt(0),
  })

  const otherPrice = parseUnits((price?.data || 0)?.toString(), token.decimals)
  const compactValue = compactFormat(otherPrice.mul(token.balance).div(10n ** 18n))
  return (
    <div
      onClick={() => {
        onSelect(token)
      }}
      className="hover:bg-Blue/main-dim flex cursor-pointer gap-2 rounded-md p-2"
    >
      <div className="flex items-center">
        <ImageIcon src={token.logoURI} size={24} />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-sm font-medium leading-4 text-white">{token.symbol}</span>
        <span className="text-blue-blue  text-2xs	leading-3">{token.name}</span>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <span className="text-sm font-medium leading-4 text-white">
          {compactFormat(token.balance, token)}
        </span>
        <span className="text-blue-blue mt-1 rounded-md text-2xs	leading-3 ">$ {compactValue}</span>
      </div>
    </div>
  )
}
