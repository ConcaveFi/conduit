import { SVGProps } from 'react'

export function DashboardIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={className || 'fill-ocean-100 w-8 h-8'}
      {...props}
    >
      <path d="M10 18V8H18V18H10ZM0 10V0H8V10H0ZM6 8V2H2V8H6ZM0 18V12H8V18H0ZM2 16H6V14H2V16ZM12 16H16V10H12V16ZM10 0H18V6H10V0ZM12 2V4H16V2H12Z" />
    </svg>
  )
}
