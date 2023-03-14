import { SVGProps } from 'react'

export function DoubleArrowIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width="36" height="40" viewBox="0 0 36 40" className={className}>
      <path
        d="M26.1 20.1001L36 30.0001L26.1 39.9001L23.272 37.0721L28.344 31.9981L2 32.0001V28.0001H28.344L23.272 22.9281L26.1 20.1001ZM9.9 0.100098L12.728 2.9281L7.656 8.0001H34V12.0001H7.656L12.728 17.0721L9.9 19.9001L0 10.0001L9.9 0.100098Z"
        fill="#3E5389"
      />
    </svg>
  )
}
