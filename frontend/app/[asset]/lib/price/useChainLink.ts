import { useQuery } from '@tanstack/react-query'
import { getContract } from '@wagmi/core'
import { from } from 'dnum'
import { chainLinkFeed } from 'perps-hooks/contracts'
import { useProvider } from 'wagmi'
import { optimism } from 'wagmi/chains'

export const ChainLinkFeeds = {
  OP: '0x0d276fc14719f9292d5c1ea2198673d1f4269246',
  SNX: '0x2fcf37343e916eaed1f1ddaaf84458a359b53877',
  ETH: '0x13e3ee699d1909e989722e753853ae30b17e08c5',
} as const
export type ChainLinkFeed = (typeof ChainLinkFeeds)[keyof typeof ChainLinkFeeds]
export function useChainLink(feed: ChainLinkFeed) {
  const chainId = optimism.id

  const provider = useProvider({ chainId })

  return useQuery(
    ['ChainLink', feed],
    async () => {
      const latestRound = await getContract({
        address: feed,
        abi: chainLinkFeed.abi,
        signerOrProvider: provider,
      }).latestRoundData()
      return from([latestRound.answer.toBigInt(), 8])
    },
    {
      refetchInterval: 30 * 1000, // 30s
      // TODO: check if we can observe the contract events
    },
  )
}
