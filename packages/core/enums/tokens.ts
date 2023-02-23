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
export const sBTC_ADDRESS: TokenAddress = {
  [optimism.id]: '0x298B9B95708152ff6968aafd889c6586e9169f1D',
  [optimismGoerli.id]: '0x23c7a77D22Fc1274eCecB703f74699500db106E6',
}
export const LINK_ADDRESS: TokenAddress = {
  [optimism.id]: '0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6',
  [optimismGoerli.id]: '0xb227f007804c16546Bd054dfED2E7A1fD5437678',
}
export const AVAX_ADDRESS: TokenAddress = {
  [optimism.id]: '0x522439fB1Da6DB24f18baAB1782486B55FE3A7b6',
  [optimismGoerli.id]: '0x',
}
