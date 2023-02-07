import { SVGProps } from 'react'

export type SailIconVariant = 'mini' | 'default'
export type SailIconProps = SVGProps<SVGSVGElement> & { variant?: SailIconVariant }
export function SailIcon({ variant = 'default', ...props }: SailIconProps) {
  if (variant === 'mini') {
    return (
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M2.66663 1.5H4.16663V6H2.66663V7.5H1.66663V6H0.166626V1.5H1.66663V0H2.66663V1.5ZM7.66663 4H9.16663V8.5H7.66663V10H6.66663V8.5H5.16663V4H6.66663V2.5H7.66663V4Z" />
      </svg>
    )
  }
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_166_2411)">
        <rect x="5" y="8" width="5" height="11" fill="#FF2E2E" />
        <rect width="5" height="11" transform="matrix(1 0 0 -1 14 15)" fill="#32FF2E" />
        <rect x="7" y="4" width="1" height="4" fill="#FF2E2E" />
        <rect width="1" height="4" transform="matrix(1 0 0 -1 16 19)" fill="#32FF2E" />
      </g>
      <defs>
        <clipPath id="clip0_166_2411">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
