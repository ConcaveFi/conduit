import { twMerge } from 'tailwind-merge'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        'animate-skeleton skeleton-from-ocean-300 skeleton-to-ocean-400 h-3 w-full rounded',
        className,
      )}
    />
  )
}
