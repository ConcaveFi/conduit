import { DoubleSidedSign } from '@tradex/icons'
import { Avatar } from '@tradex/interface'
import React from 'react'

export const SwapDivisor = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="z-10  flex h-0 justify-center ">
      <Avatar variant={'blue'} size={'lg'} onClick={onClick} className={'-mt-2'}>
        <DoubleSidedSign className="h-5 w-5" />
      </Avatar>
    </div>
  )
}
