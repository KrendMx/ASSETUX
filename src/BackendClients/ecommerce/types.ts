import type { Response } from "../types"
import type { Token } from "../main/types"

export type AuthorizedProps = {
  token: string
}

export type Login = {
  auth_token: string
}

export type LoginProps = AuthorizedProps

export type LoginResponse = Response<Login>

export type Profile = {
  id: number
  public_key: string
  issuer: string
  lastLogin: string
  widget_id: number
  email: string
  phone: string | null
  userId: string
  widget: {
    id: number
    backgroundCompany: string | null
    backgroundCompanyName: string | null
    logoCompany: string | null
    logoCompanyName: string | null
    nameCompany: string | null
  }
}

export type GetProfileProps = AuthorizedProps

export type GetProfileResponse = Response<{ user: Profile }>

export type ChangeWalletProps = AuthorizedProps & {
  wallet: string
}

export type ChangeWalletResponse = Response<unknown, { message: string }>

export type ChangeCompanyProps = AuthorizedProps & {
  nameCompany: string | null
  logoCompany: { name: string; img: string } | null
  backgroundCompany: { name: string; img: string } | null
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
  chains: {
    title: string
  }
  ecommerceUser: Profile
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
  chainId: number
  tokensId: number
  amountIn: number
  sendAmount: number
  currency: string
}

export type CreateBillResponse = Response<{
  bill: { hash: string }
}>

export type GetBillResponse = Response<{ bill: Bill }>

export type CreatePaymentProps = {
  paymentMethod: string
  email: string
  creditCard: string
  ecommerceBillId: number
}

export type CreatePaymentResponse = Response<{
  bill: { linkToPayemntString: string }
}>
