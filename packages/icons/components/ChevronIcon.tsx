import { SVGProps } from 'react'

export function ChevronIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="8"
      height="6"
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || 'fill-ocean-100 h-3 w-3'}
      {...props}
    >
      <path d="M3.78046 5.49999L0.244629 1.96416L1.4238 0.785828L3.78046 3.14333L6.13713 0.785828L7.3163 1.96416L3.78046 5.49999Z" />
    </svg>
  )
}
