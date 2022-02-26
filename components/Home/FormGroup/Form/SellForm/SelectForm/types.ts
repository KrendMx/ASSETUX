export type Error = {
  [key: string]: string | undefined
}

export type ExchangeInfo = {
  wallet: string
  timestamp: string
  creditedAmount: number
  orderId: string
}

export type DepositInfo = {
  success: boolean
}
