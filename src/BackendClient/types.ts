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
