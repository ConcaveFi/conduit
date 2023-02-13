export const marketSettingsAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_resolver',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'destination',
        type: 'address',
      },
    ],
    name: 'CacheUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bps',
        type: 'uint256',
      },
    ],
    name: 'LiquidationBufferRatioUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bps',
        type: 'uint256',
      },
    ],
    name: 'LiquidationFeeRatioUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minMargin',
        type: 'uint256',
      },
    ],
    name: 'MinInitialMarginUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sUSD',
        type: 'uint256',
      },
    ],
    name: 'MinKeeperFeeUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnerChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnerNominated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'marketKey',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'parameter',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'ParameterUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'marketKey',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'parameter',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'value',
        type: 'bytes32',
      },
    ],
    name: 'ParameterUpdatedBytes32',
    type: 'event',
  },
  {
    constant: false,
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'delayedOrderConfirmWindow',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'isResolverCached',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'liquidationBufferRatio',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'liquidationFeeRatio',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'makerFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'makerFeeDelayedOrder',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'makerFeeOffchainDelayedOrder',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'maxDelayTimeDelta',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'maxFundingVelocity',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'maxLeverage',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'maxMarketValue',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'minDelayTimeDelta',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'minInitialMargin',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'minKeeperFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'nextPriceConfirmWindow',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'nominateNewOwner',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'nominatedOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'offchainDelayedOrderMaxAge',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'offchainDelayedOrderMinAge',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'offchainMarketKey',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'offchainPriceDivergence',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'overrideCommitFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'parameters',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'overrideCommitFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFeeDelayedOrder',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFeeDelayedOrder',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFeeOffchainDelayedOrder',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFeeOffchainDelayedOrder',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxLeverage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxMarketValue',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingVelocity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'skewScale',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextPriceConfirmWindow',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'delayedOrderConfirmWindow',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minDelayTimeDelta',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxDelayTimeDelta',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'offchainDelayedOrderMinAge',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'offchainDelayedOrderMaxAge',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'offchainMarketKey',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'offchainPriceDivergence',
            type: 'uint256',
          },
        ],
        internalType: 'struct IPerpsV2MarketSettings.Parameters',
        name: '',
        type: 'tuple',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'rebuildCache',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'resolver',
    outputs: [
      {
        internalType: 'contract AddressResolver',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'resolverAddressesRequired',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: 'addresses',
        type: 'bytes32[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_delayedOrderConfirmWindow',
        type: 'uint256',
      },
    ],
    name: 'setDelayedOrderConfirmWindow',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_ratio',
        type: 'uint256',
      },
    ],
    name: 'setLiquidationBufferRatio',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_ratio',
        type: 'uint256',
      },
    ],
    name: 'setLiquidationFeeRatio',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_makerFee',
        type: 'uint256',
      },
    ],
    name: 'setMakerFee',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_makerFeeDelayedOrder',
        type: 'uint256',
      },
    ],
    name: 'setMakerFeeDelayedOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_makerFeeOffchainDelayedOrder',
        type: 'uint256',
      },
    ],
    name: 'setMakerFeeOffchainDelayedOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_maxDelayTimeDelta',
        type: 'uint256',
      },
    ],
    name: 'setMaxDelayTimeDelta',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_maxFundingVelocity',
        type: 'uint256',
      },
    ],
    name: 'setMaxFundingVelocity',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_maxLeverage',
        type: 'uint256',
      },
    ],
    name: 'setMaxLeverage',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_maxMarketValue',
        type: 'uint256',
      },
    ],
    name: 'setMaxMarketValue',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_minDelayTimeDelta',
        type: 'uint256',
      },
    ],
    name: 'setMinDelayTimeDelta',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_minMargin',
        type: 'uint256',
      },
    ],
    name: 'setMinInitialMargin',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_sUSD',
        type: 'uint256',
      },
    ],
    name: 'setMinKeeperFee',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_nextPriceConfirmWindow',
        type: 'uint256',
      },
    ],
    name: 'setNextPriceConfirmWindow',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_offchainDelayedOrderMaxAge',
        type: 'uint256',
      },
    ],
    name: 'setOffchainDelayedOrderMaxAge',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_offchainDelayedOrderMinAge',
        type: 'uint256',
      },
    ],
    name: 'setOffchainDelayedOrderMinAge',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_offchainMarketKey',
        type: 'bytes32',
      },
    ],
    name: 'setOffchainMarketKey',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_offchainPriceDivergence',
        type: 'uint256',
      },
    ],
    name: 'setOffchainPriceDivergence',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_overrideCommitFee',
        type: 'uint256',
      },
    ],
    name: 'setOverrideCommitFee',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'overrideCommitFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFeeDelayedOrder',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFeeDelayedOrder',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFeeOffchainDelayedOrder',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFeeOffchainDelayedOrder',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxLeverage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxMarketValue',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingVelocity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'skewScale',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextPriceConfirmWindow',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'delayedOrderConfirmWindow',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minDelayTimeDelta',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxDelayTimeDelta',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'offchainDelayedOrderMinAge',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'offchainDelayedOrderMaxAge',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'offchainMarketKey',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'offchainPriceDivergence',
            type: 'uint256',
          },
        ],
        internalType: 'struct IPerpsV2MarketSettings.Parameters',
        name: '_parameters',
        type: 'tuple',
      },
    ],
    name: 'setParameters',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_skewScale',
        type: 'uint256',
      },
    ],
    name: 'setSkewScale',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_takerFee',
        type: 'uint256',
      },
    ],
    name: 'setTakerFee',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_takerFeeDelayedOrder',
        type: 'uint256',
      },
    ],
    name: 'setTakerFeeDelayedOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_takerFeeOffchainDelayedOrder',
        type: 'uint256',
      },
    ],
    name: 'setTakerFeeOffchainDelayedOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'skewScale',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'takerFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'takerFeeDelayedOrder',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketKey',
        type: 'bytes32',
      },
    ],
    name: 'takerFeeOffchainDelayedOrder',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
] as const
