import { SVGProps } from 'react'

export type ChevronDirection = 'up' | 'down' | 'left' | 'right'
export interface ChevronIconProps {
  direction?: ChevronDirection
}
export function ChevronIcon({
  direction = 'down',
  className = '',
  ...props
}: ChevronIconProps & SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className={`w-5 h-5 stroke-gray-100 ${className}`}
      {...props}
    >
      {pathByDirection[direction]}
    </svg>
  )
}
const pathByDirection = {
  down: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />,
  left: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />,
  right: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />,
  up: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />,
}
