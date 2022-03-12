export type UrlRequest = {
  apiHost: string
}

export type FiatRate = {
  chain_id: string
  name: string
  token_address: string
  buy: {
    [key: string]: number
  }
  sell: {
    [key: string]: number
  }
}

export type Token = {
  id: number
  name: string
  symbol: string
  address: string
  decimals: number
  enabled: boolean
  contract: string
  fee_id: number
  stable: boolean
  chain_id: number
  logo_uri: string
  fee?: {
    id: number
    token: number
    pool: number
    service: number
  }
  market_history?: MarketHistoryData[]
}

export type MarketHistoryData = {
  price: {
    RUB: number
    UAH: number
    USD: number
  }
  timestamp: string
}

export type Blockchain = {
  id: string
  chain_id: number
  active: boolean
  title: string
  url: string
  logo: string
}

export type FiatProvider = {
  id: number
  currency: string
  type: string
  provider: string
  method: string
  min: number
  max: number
}

export type GetFiatRates = {
  status?: number
  message: string
  data?: FiatRate[]
}

export type GetTokens = {
  status?: number
  message: string
  data?: Token[]
}

export type GetFiatProviders = {
  status?: number
  message: string
  data?: FiatProvider[]
}

export type GetBlockchains = {
  status?: number
  message: string
  data?: Blockchain[]
}

export type GetPaymentUrlProps = UrlRequest & {
  ticker: string
  provider: string
  amount: number
  cryptoAddress: string
  tokenAddress: string
  chainId: number
  email: string
}

export type GetPaymentUrl = {
  status?: number
  message: string
  data?: {
    url: string
  }
}

export type SellTokenCreateProps = UrlRequest & {
  cur_in: {
    address: string
    symbol: string
    decimals: number
    chain_id: number
  }
  cur_out: {
    type: string
    currency: string
    pan: string
    holder: string
  }
  email: string
  totalAmount: number
}

export type SellTokenCreateData = {
  wallet: string
  orderId: number
  end: string
}

export type SellTokenCreate = {
  status?: number
  message: string
  data?: {
    error: boolean
    result: string | SellTokenCreateData
  }
}

export type CheckSellData = {
  orderId: string
  chainId: string
  amountIn: number
  curIn: {
    id: string
    name: string
    symbol: string
    address: string
    decimals: number
    enabled: boolean
    contract: string
    fee_id: number
    stable: boolean
    chain_id: number
    logo_uri: string
  }
  curOut: {
    id: number
    type: string
    currency: string
    amount: number
    pan: string
    holder: string
  }
  date: string
  email: string
  status: string
  timestamp: string
  wallet: string
}

export type CheckSellOrder = {
  status?: number
  message: string
  data?: {
    error: boolean
    result: string | CheckSellData
  }
}

export type CheckSellOrderProps = UrlRequest & {
  orderId: string
}

export type CloseSellOrderProps = UrlRequest & {
  orderId: string
}

export type CloseSellOrder = {
  status?: number
  message: string
  data?: {
    error: boolean
    result: string
  }
}

export type RefundRequestProps = UrlRequest & {
  orderId: string
}

export type RefundRequestResponse = {
  status?: number
  message: string
  data?: {
    error: boolean
    result?: string
  }
}

export type RefundProps = UrlRequest & {
  orderId: string
  wallet: string
  code: number
}

export type RefundResponse = {
  status?: number
  message: string
  data?: {
    error: boolean
    result?: string
  }
}

export type RequestOrdersProps = UrlRequest & {
  email: string
}

export type RequestOrdersResponse = {
  status?: number
  message: string
  data?:
    | {
        error: boolean
        result?: string
      }
    | boolean
}

export type GetRefundAmountsProps = UrlRequest & {
  chainId: number
}

export type GetRefundAmountsResponse = {
  status?: number
  message: string
  data?:
    | { message: string }
    | {
        RUB: number
        UAH: number
      }
}

export type RequestOrdersEmailProps = UrlRequest & {
  email: string
}

export type RequestOrdersEmailResponse = {
  status?: number
  message: string
  data?:
    | boolean
    | {
        message: string
        error: boolean
      }
}

export type GetEmailOrdersProps = UrlRequest & {
  email: string
  code: string
}

export type GetEmailOrdersResponse = {
  status?: number
  message: string
  data?:
    | {
        error: boolean
        message: string
      }
    | OrderInfo[]
}

export type OrderInfo = {
  id: number
  chain_id: number
  cur_in_id: number
  cur_out_id: number
  date: string
  date_to_string: string
  email: string
  fee: number
  interval_id: number
  status: string
  timestamp: string
  wallet_id: number
  amount_in: number
  total_amount: number
  order_id: string
  withdraw: boolean
  cur_in: {
    id: number
    name: string
    symbol: string
    address: string
    decimals: number
    enabled: boolean
    contract: string
    fee_id: number
    stable: boolean
    chain_id: number
    logo_uri: string
    fee: {
      id: number
      token: number
      pool: number
      service: number
    }
  }
  cur_out: {
    id: number
    type: string
    currency: string
    amount: number
    pan: string
    holder: string
  }
  wallet: {
    id: number
    address: string
    private_key: string
  }
}
