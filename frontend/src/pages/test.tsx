import { ConnectKitButton } from 'connectkit'
import { BigNumber } from 'ethers'
import {
  formatBytes32String,
  formatUnits,
  parseBytes32String,
  parseUnits,
} from 'ethers/lib/utils.js'
import { useState } from 'react'
import { FUTURES_MARKER_ABI } from 'src/utils/FuturesMarkerAbi'
import { useContractWrite } from 'wagmi'
const defaultOptions = {
  abi: FUTURES_MARKER_ABI,
  address: '0x0D10c032ad006C98C33A95e59ab3BA2b0849bD59',
  mode: 'recklesslyUnprepared',
} as const
export default function Test() {
  const [transfer, setTransfer] = useState<BigNumber>(BigNumber.from(0))
  const [size, setSize] = useState<BigNumber>(BigNumber.from(0))
  const [tracking, setTracking] = useState('')
  const [closeTracking, setCloseTracking] = useState('')
  const transferMargin = useContractWrite({
    ...defaultOptions,
    args: [transfer.toString()],
    functionName: 'transferMargin',
  })
  const modifyPosition = useContractWrite({
    ...defaultOptions,
    args: [size.toString(), formatBytes32String(tracking)],
    functionName: 'modifyPositionWithTracking',
  })
  const closePosition = useContractWrite({
    ...defaultOptions,
    args: [formatBytes32String(closeTracking)],
    functionName: 'closePositionWithTracking',
  })

  return (
    <div className="h-screen w-full bg-black">
      <ConnectKitButton></ConnectKitButton>
      <div className="my-8 flex flex-col max-w-[450px] p-6">
        <span className="text-gray-400">Transfer margin</span>
        <input
          className="h-10 mt-2 rounded-md outline-none text-gray-400 px-4 bg-dark-700"
          onChange={({ target }) =>
            setTransfer(parseUnits(Number(+target.value)?.toString() || '0'))
          }
          placeholder="transfer amount"
          type="number"
        />
        <button
          onClick={() => transferMargin.write()}
          className="bg-dark-700 mt-2 h-10 rounded-md text-gray-100"
        >
          Transfer margin
        </button>
      </div>
      <div className="my-8 flex flex-col max-w-[450px] p-6">
        <span className="text-gray-400"> Open/Modify position</span>
        <input
          className="h-10 mt-2 rounded-md outline-none text-gray-400 px-4 bg-dark-700"
          onChange={({ target }) => setSize(parseUnits(Number(+target.value)?.toString() || '0'))}
          placeholder="Size"
          type="number"
        />
        <input
          className="h-10 mt-2 rounded-md outline-none text-gray-400 px-4 bg-dark-700"
          onChange={({ target }) => setTracking(target.value)}
          placeholder="Tracking"
          value={tracking}
          type="text"
        />
        <button
          onClick={() => modifyPosition.write()}
          className="bg-dark-700 mt-2 h-10 rounded-md text-gray-100"
        >
          Open/Modify position
        </button>
      </div>
      <div className="my-8 flex flex-col max-w-[450px] p-6">
        <span className="text-gray-400">Close position</span>

        <input
          className="h-10 mt-2 rounded-md outline-none text-gray-400 px-4 bg-dark-700"
          onChange={({ target }) => setCloseTracking(target.value)}
          placeholder="Tracking"
          value={closeTracking}
          type="text"
        />
        <button
          onClick={() => closePosition.write()}
          className="bg-dark-700 mt-2 h-10 rounded-md text-gray-100"
        >
          Close position
        </button>
      </div>
    </div>
  )
}
