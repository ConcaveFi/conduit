import 'server-only'

import { QueryClient } from '@tanstack/query-core'
import { cache } from 'react'
import { provider, SupportedChainId } from '../providers/wagmi-config'
import { fetchMarkets } from './lib/market/markets'

export const getProvider = cache((chainId: SupportedChainId) => provider({ chainId }))

export const getAllMarkets = cache((chainId: SupportedChainId) => {
  const mainnetProvider = getProvider(chainId)
  return fetchMarkets({ chainId, provider: mainnetProvider })
})

export const getQueryClient = cache(() => new QueryClient())
