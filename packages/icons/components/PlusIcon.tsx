import { SVGProps } from 'react'

export function PlusIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="19"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || 'fill-ocean-200 w-8 h-8'}
      {...props}
    >
      <path d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z" />
    </svg>
  )
}
