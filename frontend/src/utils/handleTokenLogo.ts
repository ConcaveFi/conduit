export const SYNTH_TOKEN_TO_NORMAL = {
  sbtc: 'btc',
  seth: 'eth',
} as { [key: string]: string }

export function handleTokenLogo(asset?: string) {
  if (!asset) return ''
  asset = asset?.toLowerCase()
  asset = SYNTH_TOKEN_TO_NORMAL[asset] || asset
  return asset
}
