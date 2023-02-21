import { optimism, optimismGoerli } from '@wagmi/core/chains'

export type TokenAddress = { [key: number]: `0x${string}` }
export const sUSD_ADDRESS: TokenAddress = {
  [optimism.id]: '0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9',
  [optimismGoerli.id]: '0xeBaEAAD9236615542844adC5c149F86C36aD1136',
}

export const WETH_ADDRESS: TokenAddress = {
  [optimism.id]: '0x4200000000000000000000000000000000000006',
  [optimismGoerli.id]: '0x',
}

export const sETH_ADDRES: TokenAddress = {
  [optimism.id]: '0xE405de8F52ba7559f9df3C368500B6E6ae6Cee49',
  [optimismGoerli.id]: '0x2db9cB23277C4A73F1c53822AE61A68e55147E33',
}

export const DAI_ADDRESS: TokenAddress = {
  [optimism.id]: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  [optimismGoerli.id]: '0x8ea903081aa1137F11D51F64A1F372EDe67571a9',
}
