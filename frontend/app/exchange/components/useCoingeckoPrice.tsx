import { ETH_ADDRESS } from '@tradex/core'
import { useQuery } from 'wagmi'

export const useCoingeckoPrice = ({
  contractAddress,
  chainId,
  enabled = true,
}: {
  contractAddress: string
  chainId: number
  enabled?: boolean
}) => {
  const vs_currencies = 'usd'
  const plataform = {
    1: 'ethereum',
    10: 'optimistic-ethereum',
  }[chainId]
  const endpoint = 'https://api.coingecko.com/api/v3/simple/token_price'
  return useQuery(
    ['COINGECKO', plataform, contractAddress, vs_currencies],
    async () => {
      const fixedContractAddress =
        contractAddress === ETH_ADDRESS
          ? `0x4200000000000000000000000000000000000006`
          : contractAddress
      const request = await fetch(
        `${endpoint}/${plataform}?contract_addresses=${fixedContractAddress}&vs_currencies=usd`,
      )
      const response = (await request.json()) as { usd: string }

      return (+response[fixedContractAddress].usd || 0) as number
    },
    { enabled },
  )
}
