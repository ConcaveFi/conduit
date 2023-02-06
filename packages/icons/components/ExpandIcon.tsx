import { SVGProps } from 'react'

export function ExpandIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="19"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || 'fill-ocean-200 w-8 h-8'}
      {...props}
    >
      <path d="M8.33334 0.25H9.16668V2.75H8.33334V1.08333H6.66668V0.25H8.33334ZM1.66668 0.25H3.33334V1.08333H1.66668V2.75H0.833344V0.25H1.66668ZM8.33334 6.91667V5.25H9.16668V7.75H6.66668V6.91667H8.33334ZM1.66668 6.91667H3.33334V7.75H0.833344V5.25H1.66668V6.91667Z" />
    </svg>
  )
}
