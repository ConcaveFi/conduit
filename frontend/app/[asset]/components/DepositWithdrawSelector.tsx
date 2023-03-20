import { ButtonProps, cx } from '@tradex/interface'
import { Fragment, ReactNode, useEffect, useMemo, useState } from 'react'

export type DWSelectorType = 'deposit' | 'withdraw'
const DEFAULT_SELECTOR: DWSelectorType = 'deposit'
interface SelectorProps {
  default?: DWSelectorType
  children?(type: DWSelectorType): ReactNode
  onTypeChange?(type: DWSelectorType): void
}
export function DepositWithdrawSelector(props?: SelectorProps) {
  const initial = useMemo(() => props?.default || DEFAULT_SELECTOR, [props?.default])
  const [type, setType] = useState<'deposit' | 'withdraw'>(initial)

  const children = useMemo(() => props?.children?.(type), [props, type])
  useEffect(() => props?.onTypeChange?.(type), [type, props])
  return (
    <Fragment>
      <div className="bg-dark-main-bg ocean:bg-blue-main-bg flex h-11 w-full gap-2 rounded-full bg-opacity-50 p-[4px] ">
        <button {...buttonProps('deposit')}>Deposit</button>
        <button {...buttonProps('withdraw')}>withdraw</button>
      </div>
      {children}
    </Fragment>
  )
  function buttonProps(_type: DWSelectorType): ButtonProps {
    return {
      'aria-selected': type === _type,
      className: cx(
        'centered h-full basis-full rounded-full font-medium text-sm transition-none',
        'aria-diselected:btn-underline',
        'btn aria-selected:btn-primary',
      ),
      onClick: () => setType(_type),
    }
  }
}
