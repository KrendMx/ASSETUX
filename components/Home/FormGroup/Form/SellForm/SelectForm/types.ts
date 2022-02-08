export type Error = {
  [key: string]: boolean | undefined
}

export type ExchangeInfo = {
  wallet: string
  timestamp: string
  creditedAmount: number
  orderId: string
}
