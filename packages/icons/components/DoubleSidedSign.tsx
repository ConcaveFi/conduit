import { SVGProps } from 'react'

export function DoubleSidedSign({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className || 'fill-ocean-100 h-8 w-8'}
      {...props}
    >
      <path
        d="M8.95801 4.625L7.77967 5.80333L5.66634 3.69V14.6667H3.99967V3.69L1.88717 5.80333L0.708008 4.625L4.83301 0.5L8.95801 4.625ZM17.2913 11.375L13.1663 15.5L9.04134 11.375L10.2197 10.1967L12.3338 12.31L12.333 1.33333H13.9997V12.31L16.113 10.1967L17.2913 11.375Z"
        fill="#CCE1FF"
      />
    </svg>
  )
}
