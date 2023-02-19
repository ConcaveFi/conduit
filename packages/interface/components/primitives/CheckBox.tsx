import { SVGProps, useEffect, useRef, useState } from 'react'
import { Flex } from './Flex'
import { Text } from '../primitives/Text'

export interface CheckBox extends SVGProps<SVGSVGElement> {
  info?: string
  ripple?: boolean
  initialState?: boolean
  onToggle: (state: boolean) => void
}
export function CheckBox({ initialState, onToggle, className, ripple, info, ...props }: CheckBox) {
  const [state, setState] = useState(Boolean(initialState))
  const [hover, setHover] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => onToggle && onToggle(state), [state])

  const handleCLick = () => {
    setState(!state)
    if (!ref.current) return
    const ripple = document.createElement('div')
    ripple.className = 'bg-ocean-100 animate-ripple rounded-xl absolute'
    ref.current.appendChild(ripple)
    const timeout = setTimeout(() => {
      if (ref.current) ref.current.removeChild(ripple)
      clearTimeout(timeout)
    }, 500)
  }

  return (
    <Flex centered className="w-fit gap-2">
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => handleCLick()}
        className="relative w-fit h-fit  "
      >
        <svg
          width="12"
          height="12"
          fill="none"
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
          className={className || 'w-4 h-4'}
          {...props}
        >
          {state && (
            <path
              d="M0.666667 0H11.3333C11.5101 0 11.6797 0.0702379 11.8047 0.195262C11.9298 0.320286 12 0.489856 12 0.666667V11.3333C12 11.5101 11.9298 11.6797 11.8047 11.8047C11.6797 11.9298 11.5101 12 11.3333 12H0.666667C0.489856 12 0.320286 11.9298 0.195262 11.8047C0.0702379 11.6797 0 11.5101 0 11.3333V0.666667C0 0.489856 0.0702379 0.320286 0.195262 0.195262C0.320286 0.0702379 0.489856 0 0.666667 0ZM5.33533 8.66667L10.0487 3.95267L9.106 3.01L5.33533 6.78133L3.44933 4.89533L2.50667 5.838L5.33533 8.66667Z"
              fill="#00D1FF"
            />
          )}
          {!state && (
            <path
              d="M0.666667 0H11.3333C11.5101 0 11.6797 0.0702379 11.8047 0.195262C11.9298 0.320286 12 0.489856 12 0.666667V11.3333C12 11.5101 11.9298 11.6797 11.8047 11.8047C11.6797 11.9298 11.5101 12 11.3333 12H0.666667C0.489856 12 0.320286 11.9298 0.195262 11.8047C0.0702379 11.6797 0 11.5101 0 11.3333V0.666667C0 0.489856 0.0702379 0.320286 0.195262 0.195262C0.320286 0.0702379 0.489856 0 0.666667 0ZM1.33333 1.33333V10.6667H10.6667V1.33333H1.33333Z"
              fill="#3E5389"
            />
          )}
        </svg>
        {ripple && (
          <div
            ref={ref}
            className={`absolute flex justify-center items-center
            ${hover ? 'opacity-100' : 'opacity-0'} transition-all duration-300 ease-out 
            overflow-hidden w-[220%] h-[220%] rounded-full pointer-events-none
            bg-opacity-50 bg-ocean-300 -inset-[65%]
         `}
          />
        )}
      </button>
      {info && <Text className="capitalize">{info}</Text>}
    </Flex>
  )
}
