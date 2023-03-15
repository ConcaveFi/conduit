import { CheckIcon } from '@tradex/icons'
import { Avatar, Card, ModalHeader } from '@tradex/interface'
import { ethers } from 'ethers'

export const DoneTransaction = ({
  onClose,
  tx,
}: {
  onClose: VoidFunction
  tx: ethers.providers.TransactionResponse
}) => {
  return (
    <Card className="w-80 justify-center gap-6 pb-8">
      <ModalHeader message={'Done Transaction'} onClose={onClose}></ModalHeader>
      <div className="flex justify-center">
        <Avatar variant="green" size={'lg'}>
          <CheckIcon className="h-4 w-4 stroke-black" />
        </Avatar>
      </div>
      <div className="flex  justify-center">
        <span className="text-blue-blue ">Transaction successfully done</span>
      </div>
    </Card>
  )
}
