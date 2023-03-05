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
type QueryKeyConfig = Pick<UseContractReadConfig, 'scopeKey'> & { blockNumber?: number }

function queryKey({
  address,
  args,
  blockNumber,
  chainId,
  functionName,
  overrides,
  scopeKey,
}: QueryKeyArgs & QueryKeyConfig) {
  return [
    {
      entity: 'readContract',
      address,
      args,
      blockNumber,
      chainId,
      functionName,
      overrides,
      scopeKey,
    },
  ] as const
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
  /** Scope the cache to a given context. */
  scopeKey?: string
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

export function useContractRead<
  TAbi extends Abi,
  TFunctionName extends string,
  TSelectData = ReadContractResult<TAbi, TFunctionName>,
>(
  {
    abi,
    address,
    args,
    cacheTime,
    chainId: chainId_,
    enabled: enabled_ = true,
    functionName,
    isDataEqual,
    onError,
    onSettled,
    onSuccess,
    overrides,
    scopeKey,
    select,
    keepPreviousData,
    refetchIntervalInBackground,
    initialDataUpdatedAt,
    refetchInterval,
    initialData,
    staleTime,
    structuralSharing = (oldData, newData) =>
      deepEqual(oldData, newData) ? oldData : (replaceEqualDeep(oldData, newData) as any),
    suspense,
  }: UseContractReadConfig<TAbi, TFunctionName, TSelectData> = {} as any,
) {
  const chainId = useChainId({ chainId: chainId_ })
  //   const { data: blockNumber } = useBlockNumber({
  //     chainId,
  //     enabled: watch || cacheOnBlock,
  //     scopeKey: watch || cacheOnBlock ? undefined : 'idle',
  //     watch,
  //   })

  const queryKey_ = useMemo(
    () =>
      queryKey({
        address,
        args,
        // blockNumber: cacheOnBlock ? blockNumber : undefined,
        chainId,
        functionName,
        overrides,
        scopeKey,
      } as Omit<ReadContractConfig, 'abi'>),
    [address, args, chainId, functionName, overrides, scopeKey],
  )

  const enabled = useMemo(() => {
    let enabled = Boolean(enabled_ && abi && address && functionName)
    // if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
    return enabled
  }, [abi, address, enabled_, functionName])

  //   useInvalidateOnBlock({
  //     chainId,
  //     enabled: Boolean(enabled && watch && !cacheOnBlock),
  //     queryKey: queryKey_,
  //   })

  return useQuery(queryKey_, queryFn({ abi }), {
    cacheTime,
    enabled,
    isDataEqual,
    select(data) {
      const result = abi && functionName ? parseContractResult({ abi, data, functionName }) : data
      return select ? select(result) : result
    },
    initialData,
    initialDataUpdatedAt,
    refetchInterval,
    refetchIntervalInBackground,
    staleTime,
    structuralSharing,
    keepPreviousData,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
