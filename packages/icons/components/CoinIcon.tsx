import { SVGProps } from 'react'

export function CoinIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 22 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className || 'fill-ocean-100 h-8 w-8'}
      {...props}
    >
      <path d="M22 8V10C22 13.314 17.075 16 11 16C5.033 16 0.176 13.409 0.005 10.177L0 10V8C0 11.314 4.925 14 11 14C17.075 14 22 11.314 22 8ZM11 0C17.075 0 22 2.686 22 6C22 9.314 17.075 12 11 12C4.925 12 0 9.314 0 6C0 2.686 4.925 0 11 0Z" />
    </svg>
  )
}
