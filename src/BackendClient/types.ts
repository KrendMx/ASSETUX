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
  id: number
  token_id: number
  price: number
  delta: number
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
}

export type SellTokenCreateData = {
  wallet: string
  orderId: number
}

export type SellTokenCreate = {
  status?: number
  message: string
  data?: {
    error: boolean
    result: string | SellTokenCreateData
  }
}
