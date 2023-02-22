export const SYNTH_TO_NORMAL = {
  sbtc: 'btc',

  seth: 'eth',
  sBTC: 'BTC',
  sETH: 'ETH',
} as { [key: string]: string }

export function handleTokenLogo(asset?: string) {
  if (!asset) return ''
  asset = asset?.toLowerCase()
  asset = SYNTH_TO_NORMAL[asset] || asset
  return asset
}
