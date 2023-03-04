// import { useQuery } from '@tanstack/react-query'
// import { parseContractResult, readContract, ReadContractConfig, ReadContractResult } from '@wagmi/core'
// import { useBlockNumber, useChainId, UseContractReadConfig, useNetwork } from 'wagmi'
// import { optimism } from 'wagmi/chains'
// import { marketDataAbi } from './abis'
// import { marketDataAddress } from './generated'
// import { Abi } from 'abitype'
// import { useMemo } from 'react'

// type QueryKeyArgs = Omit<ReadContractConfig, 'abi'>
// type QueryKeyConfig = Pick<UseContractReadConfig, 'scopeKey'> & { blockNumber?: number }

// function queryKey({
//   address,
//   args,
//   blockNumber,
//   chainId,
//   functionName,
//   overrides,
//   scopeKey,
// }: QueryKeyArgs & QueryKeyConfig) {
//   return [
//     {
//       entity: 'readContract',
//       address,
//       args,
//       blockNumber,
//       chainId,
//       functionName,
//       overrides,
//       scopeKey,
//     },
//   ] as const
// }

// function queryFn<
//   TAbi extends Abi | readonly unknown[],
//   TFunctionName extends string,
// >({ abi }: { abi?: Abi | readonly unknown[] }) {
//   return async ({
//     queryKey: [{ address, args, chainId, functionName, overrides }],
//   }: QueryFunctionArgs<typeof queryKey>) => {
//     if (!abi) throw new Error('abi is required')
//     if (!address) throw new Error('address is required')
//     return ((await readContract({
//       address,
//       args,
//       chainId,
//       abi: abi as Abi,
//       functionName,
//       overrides,
//     })) ?? null) as ReadContractResult<TAbi, TFunctionName>
//   }
// }

// export function useContractRead<
//   TAbi extends Abi | readonly unknown[],
//   TFunctionName extends string,
//   TSelectData = ReadContractResult<TAbi, TFunctionName>,
// >(
//   {
//     abi,
//     address,
//     args,
//     cacheOnBlock = false,
//     cacheTime,
//     chainId: chainId_,
//     enabled: enabled_ = true,
//     functionName,
//     isDataEqual,
//     onError,
//     onSettled,
//     onSuccess,
//     overrides,
//     scopeKey,
//     select,
//     staleTime,
//     structuralSharing = (oldData, newData) =>
//       deepEqual(oldData, newData)
//         ? oldData
//         : (replaceEqualDeep(oldData, newData) as any),
//     suspense,
//     watch,
//   }: UseContractReadConfig<TAbi, TFunctionName, TSelectData> = {} as any,
// ) {
//   const chainId = useChainId({ chainId: chainId_ })
//   const { data: blockNumber } = useBlockNumber({
//     chainId,
//     enabled: watch || cacheOnBlock,
//     scopeKey: watch || cacheOnBlock ? undefined : 'idle',
//     watch,
//   })

//   const queryKey_ = useMemo(
//     () =>
//       queryKey({
//         address,
//         args,
//         blockNumber: cacheOnBlock ? blockNumber : undefined,
//         chainId,
//         functionName,
//         overrides,
//         scopeKey,
//       } as Omit<ReadContractConfig, 'abi'>),
//     [
//       address,
//       args,
//       blockNumber,
//       cacheOnBlock,
//       chainId,
//       functionName,
//       overrides,
//       scopeKey,
//     ],
//   )

//   const enabled = useMemo(() => {
//     let enabled = Boolean(enabled_ && abi && address && functionName)
//     if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
//     return enabled
//   }, [abi, address, blockNumber, cacheOnBlock, enabled_, functionName])

//   useInvalidateOnBlock({
//     chainId,
//     enabled: Boolean(enabled && watch && !cacheOnBlock),
//     queryKey: queryKey_,
//   })

//   return useQuery(
//     queryKey_,
//     queryFn({
//       // TODO: Remove cast and still support `Narrow<TAbi>`
//       abi: abi as Abi,
//     }),
//     {
//       cacheTime,
//       enabled,
//       isDataEqual,
//       select(data) {
//         const result =
//           abi && functionName
//             ? parseContractResult({
//                 // TODO: Remove cast and still support `Narrow<TAbi>`
//                 abi: abi as Abi,
//                 data,
//                 functionName,
//               })
//             : data
//         return select ? select(result) : result
//       },
//       refetchInterval,
//       refetchIntervalInBackground,
//       staleTime,
//       structuralSharing,
//       suspense,
//       onError,
//       onSettled,
//       onSuccess,
//     },
//   )
// }

// just to fix build, dont want to remove this commented code above
export {}
