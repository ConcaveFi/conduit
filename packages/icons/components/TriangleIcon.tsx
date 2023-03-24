import { SVGProps } from 'react'

export function TriangleIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="#000000"
      version="1.1"
      id="Capa_1"
      width="800px"
      height="800px"
      viewBox="0 0 123.959 123.959"
      xmlSpace="preserve"
      className={className || 'fill-silver ocean:fill-ocean-100 h-3 w-3'}
      {...props}
    >
      <g>
        <path d="M85.742,1.779l-56,56c-2.3,2.3-2.3,6.1,0,8.401l56,56c3.801,3.8,10.2,1.1,10.2-4.2v-112 C95.942,0.679,89.543-2.021,85.742,1.779z" />
      </g>
    </svg>
  )
}
