import { twMerge } from 'tailwind-merge'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        'animate-skeleton skeleton-from-dark-main-bg skeleton-to-dark-20 h-3 w-full rounded',
        'ocean:skeleton-from-blue-10 ocean:skeleton-to-blue-30 ',
        className,
      )}
    />
  )
}
