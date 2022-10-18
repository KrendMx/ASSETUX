import type { PayProviders, Response } from '@/core/backend/types.core.backend'
import type { Token } from '../main/types.backend.main'

export type AuthorizedProps = {
  token: string
}

export type Login = {
  auth_token: string
}

export type LoginProps = AuthorizedProps

export type LoginResponse = Response<Login>

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

export type GetProfileResponse = Response<IMerchant>

export interface IMerchant {
  user: {
    email: string
    public_key: string
    mode: MerchantMode
    type: string
    balance: { [key: string]: number }
    userId: string
  }
  widget: {
    nameCompany: string
    logoCompanyName: string
    backgroundCompanyName: string
  }
  tokens: Array<{
    id: number
    logo_uri: string
    name: string
    symbol: string
    address: string
    chain: IChain
  }>
}

export type MerchantMode = 'RETENTION' | 'TRANSFER' | 'CONNECT'

export interface Profile {
  id: number
  public_key: string
  issuer: string
  lastLogin: string
  widget_id: number
  email: string
  phone?: null
  balance: { [key: string]: number }
  fee?: null
  type: string
  mode: MerchantMode
  userId: string
  widget: Widget
  token_info?: TokenInfo[] | null
}

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
  tokens: Token[]
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
  paymentMethod: 'QIWI' | 'QIWIVISAMASTER'
}

export type GetHistoryProps = AuthorizedProps

export type GetHistoryResponse = Response<IHistory[]>

interface IHistory {
  id: number
  email?: string
  timestamp?: string
  currency: string
  creditCard?: string
  method?: PayProviders
  amount?: number
  chain?: {
    title: string
    url: string
    logo: string
  }
  token?: {
    name: string
    symbol: string
    logo_uri: string
  }

  ecommerce_payments: {
    id: number
    email?: string
    method?: PayProviders
    creditCard?: string
  }[]
}

export type CreateBillProps = AuthorizedProps & {
  amountIn: number
  currency: string
}

export type CreateBillResponse = Response<{
  hash: string
}>

export type GetBillResponse = Response<IEcommerceBill>

export interface IEcommerceBill {
  bill: {
    currency: string
    sendAmount: number
    hash: string
  }
  widget: {
    nameCompany: string
    logoCompany: string
    backgroundCompany: string
  }
}

export interface ICreatePaymentProps {
  paymentMethod: string
  email: string
  creditCard: string
  ecommerceBillHash: string
}

export type CreatePaymentResponse = Response<{
  linkToPaymentString: string
}>

export type MerchantBillResponse = Response<MerchantData>

export type TokenBalanceResponse = Response<ITokenBalance>

export type CalcFeeResponse = Response<any>

export interface ITokenBalance {
  balance: string
}

export interface MerchantData {
  token: IMerchantToken
  chain: IChain
  widget: IMerchantWidget
}

export interface IMerchantWidget {
  nameCompany: string
  logoCompany: string
  backgroundCompany: string
}

export interface IMerchantToken {
  id: number
  name: string
  symbol: string
  address: string
  chain_id: number
  logo_uri: string
}

export interface IChain {
  id: number
  title: string
  url: string
  logo: string
}
export interface Info {
  id: number
  token_id: number
  ecommerce_users_id: number
  url: string
  fixed_course: boolean
}
