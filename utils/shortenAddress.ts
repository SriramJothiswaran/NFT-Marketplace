export const shortenAddress = (address: string) =>
  `${address.substring(0, 5)}...${address.slice(address.length - 4)}`
