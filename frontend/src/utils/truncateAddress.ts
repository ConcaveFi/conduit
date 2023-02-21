export function truncateAddress(address?: string) {
  if (!address) return ''
  const firstPart = address.substring(0, 5)
  const secondPart = address.substring(address.length - 5, address.length)
  return `${firstPart}...${secondPart}`
}
