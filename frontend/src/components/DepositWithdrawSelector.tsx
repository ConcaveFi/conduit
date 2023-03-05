import { cx } from '@tradex/interface'
import { ReactNode, useMemo, useState } from 'react'

export type DWSelectorType = 'deposit' | 'withdraw'
const DEFAULT_SELECTOR: DWSelectorType = 'deposit'
interface SelectorProps {
  default?: DWSelectorType
  children?(type: DWSelectorType): ReactNode
}
export function DepositWithdrawSelector(props?: SelectorProps) {
  const initial = useMemo(() => props?.default || DEFAULT_SELECTOR, [props?.default])
  const [type, setType] = useState<'deposit' | 'withdraw'>(initial)

  const children = useMemo(() => props?.children?.(type), [props?.children, type])
  return (
    <>
      <div className="bg-ocean-600 centered flex h-14 w-full gap-2 rounded-xl p-2 ">
        <button {...buttonProps('deposit')}>Deposit</button>
        <button {...buttonProps('withdraw')}>withdraw</button>
        <br />
      </div>
      {children}
    </>
  )

  function buttonProps(_type: DWSelectorType) {
    return {
      className: cx(
        'btn centered h-full w-full',
        type === _type ? 'btn-primary' : 'btn-underline.secondary',
      ),
      onClick: () => setType(_type),
    }
  }
}
