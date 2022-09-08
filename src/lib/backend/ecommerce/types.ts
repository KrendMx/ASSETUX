import type { Response } from "@/core/backend/types"
import type { Token } from "../main/types"

export type AuthorizedProps = {
  token: string
}

export type Login = {
  auth_token: string
}

export type LoginProps = AuthorizedProps

export type LoginResponse = Response<Login>

export interface Profile {
  id: number
  public_key: string
  issuer: string
  lastLogin: string
  widget_id: number
  email: string
  phone?: null
  balance: number
  fee?: null
  type: string
  mode: "RETENTION" | "TRANSFER"
  userId: string
  widget: Widget
  token_info?: TokenInfo[] | null
}
export interface Widget {
  id: number
  backgroundCompany: string | null
  backgroundCompanyName: string | null
  logoCompany: string | null
  logoCompanyName: string | null
  nameCompany: string | null
}
export interface TokenInfo {
  id: number
  token_id: number
  ecommerce_users_id: number
  url: string
  token: Token
}

export type GetProfileProps = AuthorizedProps

export type GetProfileResponse = Response<{ user: Profile }>

export type ChangeWalletProps = AuthorizedProps & {
  wallet: string
}

export type UserImage = { name: string; img: string }

export type ChangeWalletResponse = Response<unknown, { message: string }>

export type ChangeCompanyProps = AuthorizedProps & {
  nameCompany?: string
  logoCompany?: UserImage
  backgroundCompany?: UserImage
}

export type ChangeCompanyResponse = Response

export type LogoutProps = AuthorizedProps

export type Bill = {
  id: number
  expiretTimestamp: string
  chainId: number
  tokensId: number
  currency: string
  sendAmount: number
  amountIn: number
  ecommerceUserId: number
  timestamp: string
  error: null
  tx_hash: null
  fee: null
  status: string
  tokens: Token
  hash: string
  chains: {
    title: string
  }
  ecommerceUser: Profile
  // new history type in ecom
  email?: string
  order_id?: number
  client?: string
  type?: string
  chain?: {
    title: string
  }
  token: any
  amount_in?: number
}

export type Payment = {
  id: number
  email: string
  creditCard: string
  timestamp: string
  paymentMethod: "QIWI" | "QIWIVISAMASTER"
}

export type GetHistoryProps = AuthorizedProps

export type GetHistoryResponse = Response<{
  payments: (Bill & { ecommerce_payments: Payment[] })[]
}>

export type CreateBillProps = AuthorizedProps & {
  amountIn: number
  currency: string
}

export type CreateBillResponse = Response<{
  data: {
    bill: { hash: string }
  }
}>

export type GetBillResponse = Response<{ bill: Bill }>

export type CreatePaymentProps = {
  paymentMethod: string
  email: string
  creditCard: string
  ecommerceBillId: number
  address?: string
}

export type CreatePaymentResponse = Response<{
  bill: { linkToPayemntString: string }
}>
