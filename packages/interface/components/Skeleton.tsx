import { twMerge } from 'tailwind-merge'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        'animate-skeleton skeleton-from-dark-20 skeleton-to-dark-30 h-3 w-full rounded',
        'ocean:skeleton-from-blue-20 ocean:skeleton-to-blue-30 ',
        className,
      )}
    />
  )
}
