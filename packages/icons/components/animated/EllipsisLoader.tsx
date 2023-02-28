import { SVGProps } from 'react'

export function EllipsisLoader(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }}
      width="40px"
      height="20px"
      viewBox="0 0 100 50"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <circle cx="84" cy="25" r="10">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="0.43859649122807015s"
          calcMode="spline"
          keyTimes="0;1"
          values="9;0"
          keySplines="0 0.5 0.5 1"
          begin="0s"
        ></animate>
        <animate
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="discrete"
          keyTimes="0;0.25;0.5;0.75;1"
          values="#85a2b6;#fdfdfd;#dce4eb;#bbcedd;#85a2b6"
          begin="0s"
        ></animate>
      </circle>
      <circle cx="16" cy="25" r="10">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;9;9;9"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        ></animate>
      </circle>
      <circle cx="50" cy="25" r="10">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;9;9;9"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.43859649122807015s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.43859649122807015s"
        ></animate>
      </circle>
      <circle cx="84" cy="25" r="10">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;9;9;9"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.8771929824561403s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.8771929824561403s"
        ></animate>
      </circle>
      <circle cx="16" cy="25" r="10">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;9;9;9"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.3157894736842104s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.3157894736842104s"
        ></animate>
      </circle>
    </svg>
  )
}
