const bps_divider = 10_000n

/** percent in basis points (30 = 0.3%, 100 = 1%, ...) */
export type Percent = bigint | number
export const bpsToWei = (bps: Percent) => (BigInt(bps) * 10n ** 18n) / bps_divider
