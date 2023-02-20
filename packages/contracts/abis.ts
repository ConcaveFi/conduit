export const marketAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isOffchain',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'currentRoundId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'sizeDelta',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetRoundId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'commitDeposit',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'keeperDeposit',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'trackingCode',
        type: 'bytes32',
      },
    ],
    name: 'DelayedOrderRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isOffchain',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'sizeDelta',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetRoundId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'intentionTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'executableAtTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'commitDeposit',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'keeperDeposit',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'trackingCode',
        type: 'bytes32',
      },
    ],
    name: 'DelayedOrderSubmitted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'int256',
        name: 'funding',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'fundingRate',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'FundingRecomputed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'marginDelta',
        type: 'int256',
      },
    ],
    name: 'MarginTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'trackingCode',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'baseAsset',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'marketKey',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'sizeDelta',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
    ],
    name: 'PerpsTracking',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'size',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
    ],
    name: 'PositionLiquidated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'margin',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'size',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'tradeSize',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lastPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundingIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
    ],
    name: 'PositionModified',
    type: 'event',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'accessibleMargin',
    outputs: [
      {
        internalType: 'uint256',
        name: 'marginAccessible',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'invalid',
        type: 'bool',
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
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'accruedFunding',
    outputs: [
      {
        internalType: 'int256',
        name: 'funding',
        type: 'int256',
      },
      {
        internalType: 'bool',
        name: 'invalid',
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
    name: 'assetPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'invalid',
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
    name: 'baseAsset',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'key',
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
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'canLiquidate',
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
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'cancelDelayedOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'cancelOffchainDelayedOrder',
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
        name: 'priceImpactDelta',
        type: 'uint256',
      },
    ],
    name: 'closePosition',
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
        name: 'priceImpactDelta',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'trackingCode',
        type: 'bytes32',
      },
    ],
    name: 'closePositionWithTracking',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'currentFundingRate',
    outputs: [
      {
        internalType: 'int256',
        name: 'fundingRate',
        type: 'int256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'currentFundingVelocity',
    outputs: [
      {
        internalType: 'int256',
        name: 'fundingVelocity',
        type: 'int256',
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
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'delayedOrders',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isOffchain',
            type: 'bool',
          },
          {
            internalType: 'int128',
            name: 'sizeDelta',
            type: 'int128',
          },
          {
            internalType: 'uint128',
            name: 'priceImpactDelta',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'targetRoundId',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'commitDeposit',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'keeperDeposit',
            type: 'uint128',
          },
          {
            internalType: 'uint256',
            name: 'executableAtTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'intentionTime',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'trackingCode',
            type: 'bytes32',
          },
        ],
        internalType: 'struct IPerpsV2MarketConsolidated.DelayedOrder',
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
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'executeDelayedOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'bytes[]',
        name: 'priceUpdateData',
        type: 'bytes[]',
      },
    ],
    name: 'executeOffchainDelayedOrder',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'fundingLastRecomputed',
    outputs: [
      {
        internalType: 'uint32',
        name: 'timestamp',
        type: 'uint32',
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
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'fundingSequence',
    outputs: [
      {
        internalType: 'int128',
        name: 'netFunding',
        type: 'int128',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'fundingSequenceLength',
    outputs: [
      {
        internalType: 'uint256',
        name: 'length',
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
        name: 'account',
        type: 'address',
      },
    ],
    name: 'liquidatePosition',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'liquidationFee',
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
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'liquidationPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'invalid',
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
    name: 'marketDebt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'debt',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isInvalid',
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
    name: 'marketKey',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'key',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'marketSize',
    outputs: [
      {
        internalType: 'uint128',
        name: 'size',
        type: 'uint128',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'marketSizes',
    outputs: [
      {
        internalType: 'uint256',
        name: 'long',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'short',
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
    name: 'marketSkew',
    outputs: [
      {
        internalType: 'int128',
        name: 'skew',
        type: 'int128',
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
        internalType: 'int256',
        name: 'sizeDelta',
        type: 'int256',
      },
      {
        internalType: 'uint256',
        name: 'priceImpactDelta',
        type: 'uint256',
      },
    ],
    name: 'modifyPosition',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'int256',
        name: 'sizeDelta',
        type: 'int256',
      },
      {
        internalType: 'uint256',
        name: 'priceImpactDelta',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'trackingCode',
        type: 'bytes32',
      },
    ],
    name: 'modifyPositionWithTracking',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'notionalValue',
    outputs: [
      {
        internalType: 'int256',
        name: 'value',
        type: 'int256',
      },
      {
        internalType: 'bool',
        name: 'invalid',
        type: 'bool',
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
        internalType: 'int256',
        name: 'sizeDelta',
        type: 'int256',
      },
      {
        internalType: 'enum IPerpsV2MarketBaseTypes.OrderType',
        name: 'orderType',
        type: 'uint8',
      },
    ],
    name: 'orderFee',
    outputs: [
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'invalid',
        type: 'bool',
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
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'positions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'id',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'lastFundingIndex',
            type: 'uint64',
          },
          {
            internalType: 'uint128',
            name: 'margin',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'lastPrice',
            type: 'uint128',
          },
          {
            internalType: 'int128',
            name: 'size',
            type: 'int128',
          },
        ],
        internalType: 'struct IPerpsV2MarketConsolidated.Position',
        name: '',
        type: 'tuple',
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
        internalType: 'int256',
        name: 'sizeDelta',
        type: 'int256',
      },
      {
        internalType: 'uint256',
        name: 'tradePrice',
        type: 'uint256',
      },
      {
        internalType: 'enum IPerpsV2MarketBaseTypes.OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'postTradeDetails',
    outputs: [
      {
        internalType: 'uint256',
        name: 'margin',
        type: 'uint256',
      },
      {
        internalType: 'int256',
        name: 'size',
        type: 'int256',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'liqPrice',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
      {
        internalType: 'enum IPerpsV2MarketConsolidated.Status',
        name: 'status',
        type: 'uint8',
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
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'profitLoss',
    outputs: [
      {
        internalType: 'int256',
        name: 'pnl',
        type: 'int256',
      },
      {
        internalType: 'bool',
        name: 'invalid',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'recomputeFunding',
    outputs: [
      {
        internalType: 'uint256',
        name: 'lastIndex',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'remainingMargin',
    outputs: [
      {
        internalType: 'uint256',
        name: 'marginRemaining',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'invalid',
        type: 'bool',
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
        internalType: 'int256',
        name: 'sizeDelta',
        type: 'int256',
      },
      {
        internalType: 'uint256',
        name: 'priceImpactDelta',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'desiredTimeDelta',
        type: 'uint256',
      },
    ],
    name: 'submitDelayedOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'int256',
        name: 'sizeDelta',
        type: 'int256',
      },
      {
        internalType: 'uint256',
        name: 'priceImpactDelta',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'desiredTimeDelta',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'trackingCode',
        type: 'bytes32',
      },
    ],
    name: 'submitDelayedOrderWithTracking',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'int256',
        name: 'sizeDelta',
        type: 'int256',
      },
      {
        internalType: 'uint256',
        name: 'priceImpactDelta',
        type: 'uint256',
      },
    ],
    name: 'submitOffchainDelayedOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'int256',
        name: 'sizeDelta',
        type: 'int256',
      },
      {
        internalType: 'uint256',
        name: 'priceImpactDelta',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'trackingCode',
        type: 'bytes32',
      },
    ],
    name: 'submitOffchainDelayedOrderWithTracking',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'int256',
        name: 'marginDelta',
        type: 'int256',
      },
    ],
    name: 'transferMargin',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'unrecordedFunding',
    outputs: [
      {
        internalType: 'int256',
        name: 'funding',
        type: 'int256',
      },
      {
        internalType: 'bool',
        name: 'invalid',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'withdrawAllMargin',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

export const marketDataAbi = [
  {
    inputs: [
      { internalType: 'contract IAddressResolver', name: '_resolverProxy', type: 'address' },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    constant: true,
    inputs: [],
    name: 'allMarketSummaries',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'bytes32', name: 'asset', type: 'bytes32' },
          { internalType: 'bytes32', name: 'key', type: 'bytes32' },
          { internalType: 'uint256', name: 'maxLeverage', type: 'uint256' },
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'uint256', name: 'marketSize', type: 'uint256' },
          { internalType: 'int256', name: 'marketSkew', type: 'int256' },
          { internalType: 'uint256', name: 'marketDebt', type: 'uint256' },
          { internalType: 'int256', name: 'currentFundingRate', type: 'int256' },
          { internalType: 'int256', name: 'currentFundingVelocity', type: 'int256' },
          {
            components: [
              { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFee', type: 'uint256' },
              { internalType: 'uint256', name: 'takerFeeDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFeeDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'takerFeeOffchainDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFeeOffchainDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'overrideCommitFee', type: 'uint256' },
            ],
            internalType: 'struct PerpsV2MarketData.FeeRates',
            name: 'feeRates',
            type: 'tuple',
          },
        ],
        internalType: 'struct PerpsV2MarketData.MarketSummary[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'allProxiedMarketSummaries',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'bytes32', name: 'asset', type: 'bytes32' },
          { internalType: 'bytes32', name: 'key', type: 'bytes32' },
          { internalType: 'uint256', name: 'maxLeverage', type: 'uint256' },
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'uint256', name: 'marketSize', type: 'uint256' },
          { internalType: 'int256', name: 'marketSkew', type: 'int256' },
          { internalType: 'uint256', name: 'marketDebt', type: 'uint256' },
          { internalType: 'int256', name: 'currentFundingRate', type: 'int256' },
          { internalType: 'int256', name: 'currentFundingVelocity', type: 'int256' },
          {
            components: [
              { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFee', type: 'uint256' },
              { internalType: 'uint256', name: 'takerFeeDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFeeDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'takerFeeOffchainDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFeeOffchainDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'overrideCommitFee', type: 'uint256' },
            ],
            internalType: 'struct PerpsV2MarketData.FeeRates',
            name: 'feeRates',
            type: 'tuple',
          },
        ],
        internalType: 'struct PerpsV2MarketData.MarketSummary[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'globals',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'minInitialMargin', type: 'uint256' },
          { internalType: 'uint256', name: 'liquidationFeeRatio', type: 'uint256' },
          { internalType: 'uint256', name: 'liquidationBufferRatio', type: 'uint256' },
          { internalType: 'uint256', name: 'minKeeperFee', type: 'uint256' },
        ],
        internalType: 'struct PerpsV2MarketData.FuturesGlobals',
        name: '',
        type: 'tuple',
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
        internalType: 'contract IPerpsV2MarketViews',
        name: 'market',
        type: 'address',
      },
    ],
    name: 'marketDetails',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'bytes32', name: 'baseAsset', type: 'bytes32' },
          { internalType: 'bytes32', name: 'marketKey', type: 'bytes32' },
          {
            components: [
              { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFee', type: 'uint256' },
              { internalType: 'uint256', name: 'takerFeeDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFeeDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'takerFeeOffchainDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFeeOffchainDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'overrideCommitFee', type: 'uint256' },
            ],
            internalType: 'struct PerpsV2MarketData.FeeRates',
            name: 'feeRates',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'maxLeverage', type: 'uint256' },
              { internalType: 'uint256', name: 'maxMarketValue', type: 'uint256' },
            ],
            internalType: 'struct PerpsV2MarketData.MarketLimits',
            name: 'limits',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'maxFundingVelocity', type: 'uint256' },
              { internalType: 'uint256', name: 'skewScale', type: 'uint256' },
            ],
            internalType: 'struct PerpsV2MarketData.FundingParameters',
            name: 'fundingParameters',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'marketSize', type: 'uint256' },
              {
                components: [
                  { internalType: 'uint256', name: 'long', type: 'uint256' },
                  { internalType: 'uint256', name: 'short', type: 'uint256' },
                ],
                internalType: 'struct PerpsV2MarketData.Sides',
                name: 'sides',
                type: 'tuple',
              },
              { internalType: 'uint256', name: 'marketDebt', type: 'uint256' },
              { internalType: 'int256', name: 'marketSkew', type: 'int256' },
            ],
            internalType: 'struct PerpsV2MarketData.MarketSizeDetails',
            name: 'marketSizeDetails',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'price', type: 'uint256' },
              { internalType: 'bool', name: 'invalid', type: 'bool' },
            ],
            internalType: 'struct PerpsV2MarketData.PriceDetails',
            name: 'priceDetails',
            type: 'tuple',
          },
        ],
        internalType: 'struct PerpsV2MarketData.MarketData',
        name: '',
        type: 'tuple',
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
        name: 'marketKey',
        type: 'bytes32',
      },
    ],
    name: 'marketDetailsForKey',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'bytes32', name: 'baseAsset', type: 'bytes32' },
          { internalType: 'bytes32', name: 'marketKey', type: 'bytes32' },
          {
            components: [
              { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFee', type: 'uint256' },
              { internalType: 'uint256', name: 'takerFeeDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFeeDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'takerFeeOffchainDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFeeOffchainDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'overrideCommitFee', type: 'uint256' },
            ],
            internalType: 'struct PerpsV2MarketData.FeeRates',
            name: 'feeRates',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'maxLeverage', type: 'uint256' },
              { internalType: 'uint256', name: 'maxMarketValue', type: 'uint256' },
            ],
            internalType: 'struct PerpsV2MarketData.MarketLimits',
            name: 'limits',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'maxFundingVelocity', type: 'uint256' },
              { internalType: 'uint256', name: 'skewScale', type: 'uint256' },
            ],
            internalType: 'struct PerpsV2MarketData.FundingParameters',
            name: 'fundingParameters',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'marketSize', type: 'uint256' },
              {
                components: [
                  { internalType: 'uint256', name: 'long', type: 'uint256' },
                  { internalType: 'uint256', name: 'short', type: 'uint256' },
                ],
                internalType: 'struct PerpsV2MarketData.Sides',
                name: 'sides',
                type: 'tuple',
              },
              { internalType: 'uint256', name: 'marketDebt', type: 'uint256' },
              { internalType: 'int256', name: 'marketSkew', type: 'int256' },
            ],
            internalType: 'struct PerpsV2MarketData.MarketSizeDetails',
            name: 'marketSizeDetails',
            type: 'tuple',
          },
          {
            components: [
              { internalType: 'uint256', name: 'price', type: 'uint256' },
              { internalType: 'bool', name: 'invalid', type: 'bool' },
            ],
            internalType: 'struct PerpsV2MarketData.PriceDetails',
            name: 'priceDetails',
            type: 'tuple',
          },
        ],
        internalType: 'struct PerpsV2MarketData.MarketData',
        name: '',
        type: 'tuple',
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
        internalType: 'address[]',
        name: 'markets',
        type: 'address[]',
      },
    ],
    name: 'marketSummaries',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'bytes32', name: 'asset', type: 'bytes32' },
          { internalType: 'bytes32', name: 'key', type: 'bytes32' },
          { internalType: 'uint256', name: 'maxLeverage', type: 'uint256' },
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'uint256', name: 'marketSize', type: 'uint256' },
          { internalType: 'int256', name: 'marketSkew', type: 'int256' },
          { internalType: 'uint256', name: 'marketDebt', type: 'uint256' },
          { internalType: 'int256', name: 'currentFundingRate', type: 'int256' },
          { internalType: 'int256', name: 'currentFundingVelocity', type: 'int256' },
          {
            components: [
              { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFee', type: 'uint256' },
              { internalType: 'uint256', name: 'takerFeeDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFeeDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'takerFeeOffchainDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFeeOffchainDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'overrideCommitFee', type: 'uint256' },
            ],
            internalType: 'struct PerpsV2MarketData.FeeRates',
            name: 'feeRates',
            type: 'tuple',
          },
        ],
        internalType: 'struct PerpsV2MarketData.MarketSummary[]',
        name: '',
        type: 'tuple[]',
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
        internalType: 'bytes32[]',
        name: 'marketKeys',
        type: 'bytes32[]',
      },
    ],
    name: 'marketSummariesForKeys',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'market', type: 'address' },
          { internalType: 'bytes32', name: 'asset', type: 'bytes32' },
          { internalType: 'bytes32', name: 'key', type: 'bytes32' },
          { internalType: 'uint256', name: 'maxLeverage', type: 'uint256' },
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'uint256', name: 'marketSize', type: 'uint256' },
          { internalType: 'int256', name: 'marketSkew', type: 'int256' },
          { internalType: 'uint256', name: 'marketDebt', type: 'uint256' },
          { internalType: 'int256', name: 'currentFundingRate', type: 'int256' },
          { internalType: 'int256', name: 'currentFundingVelocity', type: 'int256' },
          {
            components: [
              { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFee', type: 'uint256' },
              { internalType: 'uint256', name: 'takerFeeDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFeeDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'takerFeeOffchainDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'makerFeeOffchainDelayedOrder', type: 'uint256' },
              { internalType: 'uint256', name: 'overrideCommitFee', type: 'uint256' },
            ],
            internalType: 'struct PerpsV2MarketData.FeeRates',
            name: 'feeRates',
            type: 'tuple',
          },
        ],
        internalType: 'struct PerpsV2MarketData.MarketSummary[]',
        name: '',
        type: 'tuple[]',
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
        name: 'marketKey',
        type: 'bytes32',
      },
    ],
    name: 'parameters',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'takerFee', type: 'uint256' },
          { internalType: 'uint256', name: 'makerFee', type: 'uint256' },
          { internalType: 'uint256', name: 'overrideCommitFee', type: 'uint256' },
          { internalType: 'uint256', name: 'takerFeeDelayedOrder', type: 'uint256' },
          { internalType: 'uint256', name: 'makerFeeDelayedOrder', type: 'uint256' },
          { internalType: 'uint256', name: 'takerFeeOffchainDelayedOrder', type: 'uint256' },
          { internalType: 'uint256', name: 'makerFeeOffchainDelayedOrder', type: 'uint256' },
          { internalType: 'uint256', name: 'maxLeverage', type: 'uint256' },
          { internalType: 'uint256', name: 'maxMarketValue', type: 'uint256' },
          { internalType: 'uint256', name: 'maxFundingVelocity', type: 'uint256' },
          { internalType: 'uint256', name: 'skewScale', type: 'uint256' },
          { internalType: 'uint256', name: 'nextPriceConfirmWindow', type: 'uint256' },
          { internalType: 'uint256', name: 'delayedOrderConfirmWindow', type: 'uint256' },
          { internalType: 'uint256', name: 'minDelayTimeDelta', type: 'uint256' },
          { internalType: 'uint256', name: 'maxDelayTimeDelta', type: 'uint256' },
          { internalType: 'uint256', name: 'offchainDelayedOrderMinAge', type: 'uint256' },
          { internalType: 'uint256', name: 'offchainDelayedOrderMaxAge', type: 'uint256' },
          { internalType: 'bytes32', name: 'offchainMarketKey', type: 'bytes32' },
          { internalType: 'uint256', name: 'offchainPriceDivergence', type: 'uint256' },
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
    constant: true,
    inputs: [
      {
        internalType: 'contract IPerpsV2MarketViews',
        name: 'market',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'positionDetails',
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: 'uint64', name: 'id', type: 'uint64' },
              { internalType: 'uint64', name: 'lastFundingIndex', type: 'uint64' },
              { internalType: 'uint128', name: 'margin', type: 'uint128' },
              { internalType: 'uint128', name: 'lastPrice', type: 'uint128' },
              { internalType: 'int128', name: 'size', type: 'int128' },
            ],
            internalType: 'struct IPerpsV2MarketBaseTypes.Position',
            name: 'position',
            type: 'tuple',
          },
          { internalType: 'int256', name: 'notionalValue', type: 'int256' },
          { internalType: 'int256', name: 'profitLoss', type: 'int256' },
          { internalType: 'int256', name: 'accruedFunding', type: 'int256' },
          { internalType: 'uint256', name: 'remainingMargin', type: 'uint256' },
          { internalType: 'uint256', name: 'accessibleMargin', type: 'uint256' },
          { internalType: 'uint256', name: 'liquidationPrice', type: 'uint256' },
          { internalType: 'bool', name: 'canLiquidatePosition', type: 'bool' },
        ],
        internalType: 'struct PerpsV2MarketData.PositionData',
        name: '',
        type: 'tuple',
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
        name: 'marketKey',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'positionDetailsForMarketKey',
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: 'uint64', name: 'id', type: 'uint64' },
              { internalType: 'uint64', name: 'lastFundingIndex', type: 'uint64' },
              { internalType: 'uint128', name: 'margin', type: 'uint128' },
              { internalType: 'uint128', name: 'lastPrice', type: 'uint128' },
              { internalType: 'int128', name: 'size', type: 'int128' },
            ],
            internalType: 'struct IPerpsV2MarketBaseTypes.Position',
            name: 'position',
            type: 'tuple',
          },
          { internalType: 'int256', name: 'notionalValue', type: 'int256' },
          { internalType: 'int256', name: 'profitLoss', type: 'int256' },
          { internalType: 'int256', name: 'accruedFunding', type: 'int256' },
          { internalType: 'uint256', name: 'remainingMargin', type: 'uint256' },
          { internalType: 'uint256', name: 'accessibleMargin', type: 'uint256' },
          { internalType: 'uint256', name: 'liquidationPrice', type: 'uint256' },
          { internalType: 'bool', name: 'canLiquidatePosition', type: 'bool' },
        ],
        internalType: 'struct PerpsV2MarketData.PositionData',
        name: '',
        type: 'tuple',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'resolverProxy',
    outputs: [
      {
        internalType: 'contract IAddressResolver',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
] as const

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
