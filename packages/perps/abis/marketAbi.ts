export const perpsV2MarketAbi = [
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
