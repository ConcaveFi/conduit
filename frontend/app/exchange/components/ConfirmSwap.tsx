import { CurrencyAmount } from '@tradex/core'
import { DoubleArrowIcon } from '@tradex/icons'
import { Card, ImageIcon, ModalHeader } from '@tradex/interface'
import { useSwap } from './SwapCard'

export const ConfirmTransaction = ({
  onClose,
  ...props
}: ReturnType<typeof useSwap> & { onClose: VoidFunction }) => {
  return (
    <Card className="w-96 gap-6 pb-8">
      <ModalHeader message={'Confirm Transaction'} onClose={onClose} />
      <div className="flex justify-center gap-8">
        <ConfirmIcon label={'From'} currency={props.inputIn?.currency} />
        <div className="flex items-center">
          <DoubleArrowIcon />
        </div>
        <ConfirmIcon label={'Into'} currency={props.inputOut?.currency} />
      </div>
      <div className="flex justify-center">
        <span className="text-blue-blue text-base">
          Confirm your transaction through your wallet
        </span>
      </div>
      <ConfirmSwapDetails amountIn={props.amountIn} amountOut={props.amountOut} />
      <PoweredBy />
    </Card>
  )
}

const ConfirmIcon = ({ label, currency }: { label: string; currency: CurrencyAmount }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-blue-blue text-sm">{label}</span>
      <ImageIcon src={currency?.logoURI} size={48} />
    </div>
  )
}

const PoweredBy = () => {
  return (
    <div className=" flex justify-center">
      <span className="text-blue-blue text-base">Powered by</span>
    </div>
  )
}
const ConfirmSwapDetails = ({
  amountOut,
  amountIn,
}: {
  amountOut: CurrencyAmount
  amountIn: CurrencyAmount
}) => {
  return (
    <div className="flex w-full flex-col p-3">
      <div className="flex justify-between">
        <span className="text-Blue/main-dim  text-base">{amountIn.symbol} Amount</span>
        <span className="text-blue-blue text-base font-medium">{amountIn.formattedValue}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-Blue/main-dim  text-base">{amountOut.symbol} Amount</span>
        <span className="text-blue-blue text-base font-medium">{amountOut.formattedValue}</span>
      </div>
    </div>
  )
}
