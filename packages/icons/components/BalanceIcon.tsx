import { SVGProps } from 'react'

export function BalanceIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="19"
      viewBox="0 0 22 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || 'fill-ocean-100 h-8 w-8'}
      {...props}
    >
      <path d="M12 0V1H19V3H12V17H16V19H6V17H10V3H3V1H10V0H12ZM4 4.343L6.828 7.172C7.552 7.895 8 8.895 8 10C8 12.21 6.21 14 4 14C1.79 14 0 12.21 0 10C0 8.895 0.448 7.895 1.172 7.172L4 4.343ZM18 4.343L20.828 7.172C21.552 7.895 22 8.895 22 10C22 12.21 20.21 14 18 14C15.79 14 14 12.21 14 10C14 8.895 14.448 7.895 15.172 7.172L18 4.343ZM18 7.172L16.586 8.586C16.212 8.96 16 9.46 16 10L20 10.001C20 9.461 19.788 8.96 19.414 8.586L18 7.172ZM4 7.172L2.586 8.586C2.212 8.96 2 9.46 2 10L6 10.001C6 9.461 5.788 8.96 5.414 8.586L4 7.172Z" />
    </svg>
  )
}
