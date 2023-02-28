import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { PrimitiveInputProps } from '../../types/primitives'

interface RawSliderProps extends PrimitiveInputProps {
  defaultValue?: number
  max?: number
  min?: number
}

function RawSlider(props: RawSliderProps) {
  const { max = 100, min = 0, defaultValue, className, ...rest } = props
  const [value, setValue] = useState<number>(defaultValue || 0)
  const [pressed, setPressed] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const [width, setWidth] = useState(0)
  const size = 14

  useEffect(() => setValue(props.value ? +props.value : 0), [props.value])
  useEffect(() => setWidth(ref.current?.clientWidth || 0), [ref])
  useEffect(() => {
    if (!ref.current) return
    new ResizeObserver((e) => setWidth(e[0].target.clientWidth)).observe(ref.current)
  }, [])

  const left = useMemo(() => {
    let middle = value * (width / max)
    const difference = (middle / width) * 2 - 1
    return middle - difference * (size / 2) || 0
  }, [width, value, min, max])

  return (
    <span ref={ref} className="relative flex h-6 w-full cursor-pointer items-center">
      <div
        className="pointer-events-none absolute z-20 flex h-[5px] max-w-[100%] items-center justify-end rounded-full bg-gradient-to-r from-[#34EDB380] to-[#00D1FF80]"
        style={{ width: left }}
      />
      <Transition
        show={pressed}
        as={Fragment}
        enter="transition-[transform] duration-[0.2s] ease-out"
        enterFrom="scale-75 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition-all duration-200 ease-out"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-75 opacity-0"
      >
        <div
          className="pointer-events-none absolute z-10 flex justify-center rounded-full bg-gradient-to-r from-[#34EDB340] to-[#00D1FF40] "
          style={{ width: 30, height: 30, left: left - 15 }}
        >
          <div className="centered bg-ocean-600 border-ocean-400 -mt-12 flex h-10 min-w-[40px] rounded-lg border-2 shadow-xl">
            <span className="text-high">{value}</span>
          </div>
        </div>
      </Transition>
      <input
        max={max}
        type="range"
        onMouseDown={() => setPressed(true)}
        onInput={(e) => setValue(+e.currentTarget.value)}
        className={`green-slider ${className}`}
        onMouseUp={() => setPressed(false)}
        value={value || 0}
        min={min}
        {...rest}
      />
    </span>
  )
}
export interface SliderProps extends RawSliderProps {
  track?: boolean
}
export function Slider({ track = false, ...props }: SliderProps) {
  const { max = 100, min = 0 } = props
  const trackAmount = 5
  const steps = max / (trackAmount - 1)

  if (track)
    return (
      <div className="flex flex-col gap-1">
        <RawSlider max={max} min={min} {...props} />
        <div className="pointer-events-none relative mx-auto flex w-full justify-between px-[6px]">
          {new Array(5).fill(0).map((_, i) => (
            <div key={i}>
              <div className="bg-ocean-300 h-[8px] w-[2px] justify-center" style={{}}>
                <span className="text-high absolute mt-2">{i * steps}</span>
              </div>
              {/* {i <= 3 && (
                <div
                  style={{
                    backgroundPosition: '12px 0px',
                    backgroundImage: 'url(assets/track.svg)',
                    backgroundSize: '100% 8px',
                  }}
                  className="w-[85px] "
                ></div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    )
  return <RawSlider {...props} />
}
