import { useQuery } from '@tanstack/react-query'
import { Currency, ETH_ADDRESS, Exchange, Token } from '@tradex/core'
import { ChevronIcon, SearchIcon, Spinner } from '@tradex/icons'
import { Avatar, Card, ImageIcon, Input, Modal, ModalHeader, cx } from '@tradex/interface'
import { fetchBalance } from '@wagmi/core'
import { BigNumber } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { useDisclosure } from 'hooks/useDisclosure'
import { useEffect, useState } from 'react'
import { compactFormat } from 'utils/format'
import { useAccount, useBalance, useChainId } from 'wagmi'
import { useCoingeckoPrice } from './useCoingeckoPrice'

type CoinBalance = Token & { balance: BigNumber }

export const useTokenList = () => {
  const chainId = useChainId()
  const account = useAccount()
  return useQuery(['tokens', chainId], async () => {
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
}

const useCurrencySelector = () => {
  const [search, setSearch] = useState('')
  const { data: tokensData, ...tokensQuery } = useTokenList()
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
      <div className="flex h-full flex-col justify-end md:w-fit  ">
        <div
          onClick={() => modalProps.onOpen()}
          className="bg-dark-30 ocean:bg-blue-30 flex cursor-pointer gap-2 rounded-full bg-opacity-50 p-2 hover:bg-opacity-100"
        >
          <Avatar variant={'icon'} size="sm">
            <ImageIcon src={currency.logoURI} />
          </Avatar>

          <span className="text-dark-accent ocean:text-blue-accent mr-auto text-sm">
            {currency.symbol}
          </span>
          <div className="flex flex-col justify-center">
            <ChevronIcon className="fill-dark-accent ocean:fill-blue-accent mr-2 h-3 w-3" />
          </div>
        </div>
        <div className="text-dark-30 ocean:text-blue-30 flex w-full justify-between text-sm">
          Balance
          <div className="text-dark-accent ocean:text-blue-accent text-sm text-opacity-70">
            {compactFormat(balance || BigNumber.from(0), currency)}
          </div>
        </div>
        <Modal className="w-full sm:w-fit" onClose={modalProps.onClose} isOpen={modalProps.isOpen}>
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
    <Card className=" w-full gap-2 md:w-80 ">
      <ModalHeader message={'Search Token'} onClose={onClose} />
      <Input
        onChange={({ target }) => setSearch(target.value)}
        placeholder={'Search Token'}
        variant={'primary'}
        left={SearchIcon}
        value={search}
      />
      <div className="flex justify-between p-2">
        <p className="text-dark-30 ocean:text-blue-30 text-md">Tokens</p>
        <p className="text-dark-30 ocean:text-blue-30 text-md">Holdings</p>
      </div>
      <div className=" flex h-96 flex-col overflow-y-auto">
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <Spinner className={'fill-dark-accent ocean:fill-blue-accent h-8 w-8'} />
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
      className={cx(
        'flex cursor-pointer gap-2 rounded-md p-2',
        'even:bg-dark-main-bg ocean:even:bg-blue-main-bg',
        'hover:bg-dark-20 ocean:hover:bg-blue-20',
      )}
    >
      <div className="flex items-center">
        <ImageIcon src={token.logoURI} size={24} />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-sm font-medium leading-4 text-white">{token.symbol}</span>
        <span className="text-dark-30 ocean:text-blue-30  text-2xs	leading-3">{token.name}</span>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <span className="text-sm font-medium leading-4 text-white">
          {compactFormat(token.balance, token)}
        </span>
        <span className="text-dark-30 ocean:text-blue-30 text-2xs mt-1 rounded-md	leading-3 ">
          $ {compactValue}
        </span>
      </div>
    </div>
  )
}
