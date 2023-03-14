import { HTMLAttributes } from 'react'

export const Icon = ({
  asset,
  size,
}: { asset: string; size?: number } & HTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      src={`/assets/tokens/${asset}.png`}
      tw="rounded-full"
      width={size || '100%'}
      height={size || '100%'}
    />
  )
}

export const ImageIcon = ({
  src,
  size,
}: { src: string; size?: number } & HTMLAttributes<HTMLImageElement>) => {
  return <img src={src} tw="rounded-full" width={size || '100%'} height={size || '100%'} />
}
