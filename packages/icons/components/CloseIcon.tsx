import { SVGProps } from 'react'

export function CloseIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="19"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || 'fill-ocean-200 h-8 w-8'}
      {...props}
    >
      <path d="M2.99999 2.41083L5.06249 0.348328L5.65166 0.937494L3.58916 2.99999L5.65166 5.06249L5.06249 5.65166L2.99999 3.58916L0.937494 5.65166L0.348328 5.06249L2.41083 2.99999L0.348328 0.937494L0.937494 0.348328L2.99999 2.41083Z" />
    </svg>
  )
}
