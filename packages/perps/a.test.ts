import { describe, it, expect } from 'vitest'

import { utils, providers, Wallet } from 'ethers'
import { optimism } from 'wagmi/chains'
import { goerliMarketData } from './marketData/marketData'
import { getContract, erc20ABI } from '@wagmi/core'

const { AlchemyProvider, JsonRpcProvider } = providers
const { parseBytes32String } = utils

const provider = new JsonRpcProvider('http://127.0.0.1:8545', {
  chainId: optimism.id,
  name: optimism.network,
})

const sUsd = getContract({
  address: '0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9',
  abi: erc20ABI,
  signerOrProvider: provider,
})

describe('market data', () => {
  it('aaaaa', async () => {
    const b = await sUsd.balanceOf('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')
    console.log(b.toString())
    expect(b).toBe(0)
    // const market = goerliMarketData.connect(provider)
    // const [allProxiedMarketSummaries, globals] = await Promise.all([
    //   market.allProxiedMarketSummaries(),
    //   market.globals(),
    // ])
    // console.log(parseBytes32String(allProxiedMarketSummaries[0].key))
    // console.log({ ...allProxiedMarketSummaries[0] })
  })
})
