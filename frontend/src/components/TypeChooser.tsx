import { useState } from 'react'

export type PlaceOrder = 'sell' | 'buy'
interface PlaceOrderProps {
  defaultType?: PlaceOrder
  onTypeChange?: (type: PlaceOrder) => void
}
export function TypeChooser({ defaultType = 'buy', onTypeChange }: PlaceOrderProps) {
  const [activeType, setActiveType] = useState<PlaceOrder>(defaultType)

  function changeType(type: PlaceOrder) {
    if (onTypeChange) onTypeChange(type)
    setActiveType(type)
  }

  return (
    <div className="flex w-[85%] mx-auto h-12 border-dark-700 bg-dark-700 rounded-md">
      <ChooseButton onClick={changeType} type="buy" active={activeType === 'buy'} />
      <ChooseButton onClick={changeType} type="sell" active={activeType === 'sell'} />
    </div>
  )
}

interface ChooseButtonProps {
  active?: boolean
  type: PlaceOrder
  onClick: (type: PlaceOrder) => void
}
function ChooseButton(props: ChooseButtonProps) {
  const { active = false } = props
  const type = props.type
  return (
    <button
      onClick={() => props.onClick(type)}
      className={`
        flex flex-1 items-center rounded-md
        justify-center text-gray-200 
        font-mont text-sm font-bold capitalize
        ${
          active
            ? type === 'sell'
              ? 'bg-red-gradient text-red-100'
              : 'bg-green-gradient text-green-100'
            : 'hover:underline'
        }  
      `}
    >
      {type}
    </button>
  )
}
