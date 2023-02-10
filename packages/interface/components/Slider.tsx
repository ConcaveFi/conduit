import { Transition } from '@headlessui/react'
import { useRef, useState, useMemo, Fragment, useEffect } from 'react'
import { PrimitiveInputProps } from '../types/primitives'
import { Flex } from './Flex'

interface RawSliderProps extends PrimitiveInputProps {
  onValue?: (val: number) => void
  defaultValue?: number
  max?: number
  min?: number
}

function RawSlider(props: RawSliderProps) {
  const { max = 100, min = 0, defaultValue = 0, onValue = () => {}, className } = props
  const [value, setValue] = useState(defaultValue)
  const [pressed, setPressed] = useState(false)
  const ref = useRef<HTMLDivElement>()
  const [width, setWidth] = useState(0)
  const size = 14

  useEffect(() => setWidth(ref.current?.clientWidth || 0), [ref])
  useEffect(() => onValue(value), [value])
  const left = useMemo(() => {
    let middle = value * (width / max)
    const difference = (middle / width) * 2 - 1
    return middle - difference * (size / 2) || 0
  }, [width, value, min, max])

  return (
    <div ref={ref} className="flex items-center relative">
      <div
        className="bg-gradient-to-r max-w-[100%] from-[#34EDB380] to-[#00D1FF80] flex justify-end items-center z-20 pointer-events-none h-[5px] rounded-full absolute"
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
          className="bg-gradient-to-r  from-[#34EDB340] to-[#00D1FF40] absolute pointer-events-none z-10 rounded-full "
          style={{ width: 30, height: 30, left: left - 15 }}
        />
      </Transition>
      <input
        max={max}
        type="range"
        onMouseDown={() => setPressed(true)}
        onInput={(e) => setValue(+e.currentTarget.value)}
        className={`green-slider ${className}`}
        onMouseUp={() => setPressed(false)}
        value={value}
        min={min}
      />
    </div>
  )
}
export interface SliderProps extends RawSliderProps {
  track?: boolean
}
export function Slider({ track = false, ...props }: SliderProps) {
  if (track)
    return (
      <Flex column className=" gap-1">
        <RawSlider {...props} />
        <Flex
          style={{ width: `` }}
          justify="between"
          className="w-full pointer-events-none mx-auto relative px-[6px]"
        >
          {new Array(5).fill(0).map((_, i) => (
            <Flex key={i}>
              <Flex className="bg-ocean-300 w-[2px] h-[8px] absolut" style={{}}></Flex>
              {i <= 3 && (
                <Flex
                  style={{
                    backgroundPosition: '12px 0px',
                    backgroundImage: 'url(assets/track.svg)',
                    backgroundSize: '80px 8px',
                  }}
                  className="w-[85px] "
                />
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>
    )
  return <RawSlider {...props} />
}
