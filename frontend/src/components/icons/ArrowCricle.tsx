import { SVGProps } from 'react'

export type ArrowCircleDirection = 'up' | 'down' | 'right' | 'left'
export interface ArrowCircleProps extends SVGProps<SVGSVGElement> {
  direction?: ArrowCircleDirection
}
export function ArrowCircle({ direction = 'down', className = '', ...props }: ArrowCircleProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-6 h-6 stroke-gray-200 ${className}`}
      {...props}
    >
      {pathByDirection[direction]}
    </svg>
  )
}
const pathByDirection = {
  up: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  down: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  left: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  right: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
}
