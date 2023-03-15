import { SVGProps } from 'react'

export function CloseIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className || 'fill-ocean-100 h-3 w-3'}
    >
      <path d="M1 1 L9 9 M1 9 L9 1" strokeWidth="1" />
    </svg>
  )
}
