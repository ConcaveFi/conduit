import axios from 'axios'
import { BigNumber, utils } from 'ethers'
import { CurrencyKey } from '@synthetixio/contracts-interface';
import { Currency, CurrencyAmount } from '.';
const PROTOCOLS =
  'OPTIMISM_UNISWAP_V3,OPTIMISM_SYNTHETIX,OPTIMISM_SYNTHETIX_WRAPPER,OPTIMISM_ONE_INCH_LIMIT_ORDER,OPTIMISM_ONE_INCH_LIMIT_ORDER_V2,OPTIMISM_CURVE,OPTIMISM_BALANCER_V2,OPTIMISM_VELODROME,OPTIMISM_KYBERSWAP_ELASTIC';
export const DEFAULT_1INCH_SLIPPAGE = 3;


export function keyBy<T>(array: T[], key: keyof T): Record<string, T> {
  return array.reduce((result, item) => {
    const keyValue = String(item[key]);
    return {
      ...result,
      [keyValue]: item,
    };
  }, {});
}
export const CONDUIT_REFERRAL_ADDRESS = process.env.CONDUIT_REFERRAL_ADDRESS || '0x886148a6bd2c71db59ab3aad230af9f3254173ee';

interface Provider { }
export class OneInch implements Provider {
  private readonly endpoint: string //
  private readonly chainId: number
  private cacheTokens?: OneInchTokenListResponse

  static factory = ({ chainId }: { chainId: number }) => new OneInch({ endpoint: 'https://api.1inch.io/v5.0/10', chainId })

  constructor({ endpoint, chainId }: { endpoint: string, chainId: number }) {
    this.endpoint = endpoint
    this.chainId = chainId
  }

  public async fetchTokenList() {
    const response = this.cacheTokens || (await axios.get<OneInchTokenListResponse>(`${this.endpoint}/tokens`)).data
    this.cacheTokens = response;
    const tokensMap = response.tokens
    const tokens = Object.values(tokensMap).map((t) => ({ ...t, chainId: this.chainId, tags: [] }));
    return {
      tokens,
      tokensMap: keyBy(tokens, 'symbol'),
      symbols: tokens.map((token) => token.symbol),
    };
  }

  public async fetchApproveAddress() {
    const response = await axios.get<OneInchApproveSpenderResponse>(
      this.endpoint + '/approve/spender'
    );

    return response.data.address;
  }

  public async quote({ baseCurrency, quoteCurrency }: { baseCurrency: CurrencyAmount, quoteCurrency: Currency }) {
    if (baseCurrency.value.eq(0)) throw { message: 'Invalid amound of baseToken' }

    const params = {
      fromTokenAddress: baseCurrency.address,
      toTokenAddress: quoteCurrency.address,
      amount: baseCurrency.value.toString(),
    };
    const response = await axios.get<OneInchQuoteResponse>(this.endpoint + '/quote', {
      params: {
        fromTokenAddress: params.fromTokenAddress,
        toTokenAddress: params.toTokenAddress,
        amount: params.amount,
        disableEstimate: true,
        PROTOCOLS,
      },
    }).catch(e => {
      throw { message: e.response.data.description }
    })
    return { ...quoteCurrency, value: BigNumber.from(response.data.toTokenAmount) }
  }

  public async fetchSwapData(
    quote: Currency,
    base: CurrencyAmount,
    walletAddress: string,
  ) {
    if (base.value.eq(0)) throw { message: 'Invalid amound of baseToken' }
    const res = await axios.get<OneInchSwapResponse>(this.endpoint + '/swap', {
      params: {
        fromTokenAddress: base.address,
        toTokenAddress: quote.address,
        amount: base.value,
        fromAddress: walletAddress,
        slippage: DEFAULT_1INCH_SLIPPAGE,
        PROTOCOLS,
        referrerAddress: CONDUIT_REFERRAL_ADDRESS,
        disableEstimate: true,
      },
    });
    return res
  }
}

type Token = {
  symbol: CurrencyKey;
  name: string;
  address: `0x${string}`;
  decimals: number;
  logoURI: string;
};

export type OneInchQuoteResponse = {
  fromToken: Token;
  toToken: Token;
  toTokenAmount: string;
  fromTokenAmount: string;
};

export type OneInchSwapResponse = OneInchQuoteResponse & {
  tx: {
    from: string;
    to: string;
    data: string;
    value: string;
    gasPrice: string;
    gas: number;
  };
};

export type OneInchApproveSpenderResponse = {
  address: `0x${string}`;
};

export type OneInchTokenListResponse = {
  tokens: Record<string, Token>;
};

