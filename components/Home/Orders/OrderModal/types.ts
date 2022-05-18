export type OrderInfo = {
  id: number
  chainId: number
  status: string
  curIn: string
  tokenLogo: string
  curOut: string
  amountIn: number
  amountOut: number
  email: string
  buy: boolean
  orderId: string | null
}
