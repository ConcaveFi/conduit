import { SVGProps } from 'react'

export function MennuIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="16"
      fill="none"
      className={className || 'fill-ocean-300 h-6 w-6'}
      {...props}
    >
      <path fill="#00D0FE" d="M0 0h18v2H0V0Zm0 7h12v2H0V7Zm0 7h18v2H0v-2Z" />
    </svg>
  )
}
