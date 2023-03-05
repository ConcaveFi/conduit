import {
  QueryFunctionContext,
  replaceEqualDeep,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import {
  deepEqual,
  parseContractResult,
  readContract,
  ReadContractConfig,
  ReadContractResult,
} from '@wagmi/core'
import { Abi } from 'abitype'
import { useMemo } from 'react'
import { useChainId } from 'wagmi'

type QueryKeyArgs = Omit<ReadContractConfig, 'abi'>

function queryKey({ address, args, chainId, functionName, overrides }: QueryKeyArgs) {
  return [{ address, args, chainId, functionName, overrides }] as const
}

type QueryFunctionArgs<T extends (...args: any) => any> = QueryFunctionContext<ReturnType<T>>

function queryFn<TAbi extends Abi | readonly unknown[], TFunctionName extends string>({
  abi,
}: {
  abi?: Abi | readonly unknown[]
}) {
  return async ({
    queryKey: [{ address, args, chainId, functionName, overrides }],
  }: QueryFunctionArgs<typeof queryKey>) => {
    if (!abi) throw new Error('abi is required')
    if (!address) throw new Error('address is required')
    return ((await readContract({
      address,
      args,
      chainId,
      abi: abi as Abi,
      functionName,
      overrides,
    })) ?? null) as ReadContractResult<TAbi, TFunctionName>
  }
}

/**
 * Makes {@link TKeys} optional in {@link TType} while preserving type inference.
 */
// s/o trpc (https://github.com/trpc/trpc/blob/main/packages/server/src/types.ts#L6)
export type PartialBy<TType, TKeys extends keyof TType> = Partial<Pick<TType, TKeys>> &
  Omit<TType, TKeys>

type NgmiQueryOptions<TData, TError, TSelectData = TData> = Pick<
  UseQueryOptions<TData, TError, TSelectData>,
  | 'cacheTime'
  | 'enabled'
  | 'isDataEqual'
  | 'keepPreviousData'
  | 'select'
  | 'staleTime'
  | 'structuralSharing'
  | 'suspense'
  | 'onError'
  | 'onSettled'
  | 'onSuccess'
  | 'initialData'
  | 'initialDataUpdatedAt'
  | 'refetchIntervalInBackground'
> & {
  refetchInterval?: number | false
}

export type UseContractReadConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TSelectData = ReadContractResult<TAbi, TFunctionName>,
> = PartialBy<
  ReadContractConfig<TAbi, TFunctionName>,
  'abi' | 'address' | 'args' | 'functionName'
> &
  NgmiQueryOptions<ReadContractResult<TAbi, TFunctionName>, Error, TSelectData>

const _structuralSharing = <TData>(oldData: TData | undefined, newData: TData): TData =>
  deepEqual(oldData, newData) ? oldData : (replaceEqualDeep(oldData, newData) as any)

/**
 * since OP emits one block per tx, wagmi's `watch` option fires too often (once every block)
 * this hook differs from wagmi's by removing the `watch` option in favor of a `refetchInterval`
 */
export function useContractRead<
  TAbi extends Abi,
  TFunctionName extends string,
  TSelectData = ReadContractResult<TAbi, TFunctionName>,
>(
  {
    abi,
    address,
    args,
    chainId: chainId_,
    functionName,
    overrides,
    select,
    onError,
    onSettled,
    structuralSharing = _structuralSharing,
    ...options
  }: UseContractReadConfig<TAbi, TFunctionName, TSelectData> = {} as any,
) {
  const chainId = useChainId({ chainId: chainId_ })

  const queryKey_ = useMemo(
    () => queryKey({ address, args, chainId, functionName, overrides } as QueryKeyArgs),
    [address, args, chainId, functionName, overrides],
  )

  return useQuery(queryKey_, queryFn({ abi }), {
    enabled: Boolean(abi && address && functionName),
    onSettled,
    onError,
    structuralSharing,
    ...options,
    select(data) {
      const result = parseContractResult({ abi: abi!, data, functionName: functionName! })
      return (select ? select(result) : result) as TSelectData
    },
  })
}
