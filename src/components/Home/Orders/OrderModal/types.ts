export type OrderInfo = {
  id: number
  chainId: number
  status: string
  curIn: string
  tokenLogo: string
  curOut: string
  amountIn: number
  amountOut: number
  buy: boolean
  orderId: string | null
  date: string
}
