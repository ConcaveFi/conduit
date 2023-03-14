import { OneInch } from './1inch';
import { BigNumber, Signer } from 'ethers';

type Coin = {
  symbol: string
  decimals: number
  name: string
  logoURI: string
}
export type Token = Coin & {
  address: `0x${string}`
}

export const ETH_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
export type Native = Coin & { address: typeof ETH_ADDRESS }
export type Currency = Token | Native
export type CurrencyAmount = Currency & { value: BigNumber, formattedValue?: string }

export class Exchange {
  constructor({ chainId }: { chainId: number }) {
    this.oneInch = OneInch.factory({ chainId })
  }
  private readonly oneInch: OneInch

  public listTokens() {
    return this.oneInch.fetchTokenList()
  }

  public async buildSwapArgs({ baseCurrency, quoteCurrency, signer }: { baseCurrency: CurrencyAmount, quoteCurrency: Currency, signer: Signer }) {
    const address = signer.getAddress()
    const txProvider = await this.getTxProvider(baseCurrency.symbol, quoteCurrency.symbol);
    if (txProvider === '1inch') {
      const swapData = this.oneInch.fetchSwapData(quoteCurrency, baseCurrency, await address)
      return swapData;
    }
    throw { message: 'txProvider not found' }
  }

  public async fetchSpender({ baseCurrency, quoteCurrency }: { baseCurrency: CurrencyAmount, quoteCurrency: Currency }) {
    const txProvider = await this.getTxProvider(baseCurrency.symbol, quoteCurrency.symbol);
    if (txProvider === '1inch') {
      const spender = await this.oneInch.fetchApproveAddress();
      return spender
    }
    throw { message: 'txProvider not found' }
  }

  public async quote({ baseCurrency, quoteCurrency }: { baseCurrency: CurrencyAmount, quoteCurrency: Currency }) {
    const txProvider = await this.getTxProvider(baseCurrency.symbol, quoteCurrency.symbol);
    if (txProvider === '1inch') {
      const estimatedAmount = await this.oneInch.quote({ baseCurrency, quoteCurrency });
      return { ...estimatedAmount } satisfies CurrencyAmount;
    }
    throw { message: 'txProvider not found' }
  }

  async getTxProvider(baseCurrencyKey: string, quoteCurrencyKey: string) {
    // TODO: synthetix
    const oneInchTokens = await this.oneInch.fetchTokenList()
    const tokensMap = oneInchTokens.tokensMap
    if (tokensMap[baseCurrencyKey] && tokensMap[quoteCurrencyKey]) return '1inch';
    return "synthswap"
  }
}