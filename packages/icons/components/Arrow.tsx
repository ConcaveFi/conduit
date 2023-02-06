import { SVGProps } from 'react'

export function Arrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.50002 1.914V8H3.50002V1.914L0.818023 4.596L0.111023 3.889L4.00002 0L7.88902 3.889L7.18202 4.596L4.50002 1.914Z"
        fill="#32FF2E"
      />
    </svg>
  )
}
