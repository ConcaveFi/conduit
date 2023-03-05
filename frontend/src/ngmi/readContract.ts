import { ContractMethodDoesNotExistError, getContract, Provider } from '@wagmi/core'
import type { Abi } from 'abitype'

import { normalizeFunctionName } from './normalizeFunctionName'
import { GetConfig, GetOverridesForAbiStateMutability, GetReturnType } from './types'

type StateMutability = 'pure' | 'view'
export type ReadContractConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = GetConfig<TAbi, TFunctionName, StateMutability> & {
  /** Chain id to use for provider */
  chainId?: number
  /** Call overrides */
  overrides?: GetOverridesForAbiStateMutability<StateMutability>
}

export type ReadContractResult<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = GetReturnType<TAbi, TFunctionName>

export async function readContract<TAbi extends Abi, TFunctionName extends string>({
  address,
  provider,
  abi,
  functionName,
  overrides,
  args = [],
}: ReadContractConfig<TAbi, TFunctionName> & { provider: Provider }): Promise<
  ReadContractResult<TAbi, TFunctionName>
> {
  const contract = getContract({
    address,
    abi,
    signerOrProvider: provider,
  })

  const normalizedFunctionName = normalizeFunctionName({ contract, functionName, args })
  const contractFunction = contract[normalizedFunctionName]
  if (!contractFunction)
    throw new ContractMethodDoesNotExistError({
      address,
      functionName: normalizedFunctionName,
    })

  return contractFunction(...(args as unknown[]), ...(overrides ? [overrides] : []))
}
