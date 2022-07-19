import { Response, UrlRequest } from "@/core/backend/types"

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
  logo?: string
}

export type GetFiatRates = Response<FiatRate[]>

export type GetTokens = Response<Token[]>

export type GetFiatProviders = Response<{ fiatproviders: FiatProvider[] }>

export type GetBlockchains = Response<Blockchain[]>

export type GetPaymentUrlProps = UrlRequest & {
  ticker: string
  provider: string
  amount: number
  cryptoAddress: string
  tokenAddress: string
  chainId: number
  email: string
  card: string
}

export type GeyPaymentUrlData = {
  id?: number
  link?: string
  message?: string
}

export type GetPaymentUrl = Response<GeyPaymentUrlData>

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

export type SellTokenCreate = Response<
  { error: false; result: SellTokenCreateData },
  { error: true; result: string }
>

export type CheckSellData = {
  orderId: string
  chainId: string
  amountIn: number
  curIn: Token
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

export type CheckSellOrder = Response<
  {
    error: false
    result: CheckSellData
  },
  {
    error: true
    result: string
  }
>

export type CheckSellOrderProps = UrlRequest & {
  orderId: string
}

export type CloseSellOrderProps = UrlRequest & {
  orderId: string
}

export type CloseSellOrder = Response<
  {
    error: false
    result: string
  },
  {
    error: true
    result: string
  }
>

export type RefundRequestProps = UrlRequest & {
  orderId: string
}

export type RefundRequestResponse = Response<
  {
    error: false
    result: string
  },
  {
    error: true
  }
>

export type RefundProps = UrlRequest & {
  orderId: string
  wallet: string
  code: number
}

export type RefundResponse = Response<
  {
    error: false
    result: string
  },
  {
    error: true
  }
>

export type RequestOrdersProps = UrlRequest & {
  email: string
}

export type RequestOrdersResponse = Response<
  boolean,
  { error: true; result?: string }
>

export type GetRefundAmountsProps = UrlRequest & {
  chainId: number
}

export type GetRefundAmountsResponse = Response<
  {
    RUB: number
    UAH: number
  },
  { message: string }
>

export type RequestOrdersEmailProps = UrlRequest & {
  email: string
}

export type RequestOrdersEmailResponse = Response<
  boolean,
  {
    message: string
    error: true
  }
>

export type GetEmailOrdersProps = UrlRequest & {
  email: string
  code: string
}

export type GetEmailOrdersResponse = Response<
  OrdersData,
  {
    error: true
    message: string
  }
>

export type OrdersData = {
  sell: SellOrderInfo[]
  buy: {
    request: BuyOrderInfo[]
    success: BuyOrderInfo[]
    error: BuyOrderInfo[]
  }
}

export type BuyOrderInfo = {
  id: number
  email: string
  provider: string
  type: string
  created: string
  currency: string
  amount_in: number
  token_id: number
  crypto_address: string
  chain_id: number
  closed: boolean
  token: Token
  send_amount?: number
}

export type SellOrderInfo = {
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

export type CheckLiquidityProps = UrlRequest & {
  chainId: number
}

export type LiquidityData = {
  buy: boolean
  sell: boolean
}

export type CheckLiquidityResponse = Response<LiquidityData>

export type PostData = {
  id: number
  title: string
  img: string
  created: string
  category: string
  slug: string
  short_description: string
  pinned: boolean
  text: string
}

export type NewsData = {
  pin: PostData | null
  news: PostData[] | null
  total_pages: number
}

export const postCategories = ["all", "news", "articles", "actual"] as const
export type PostCategory = typeof postCategories[number]

export const isPostCategoryDeclared = (
  value: string
): value is PostCategory => {
  return postCategories.findIndex((category) => category == value) != -1
}

export type GetNewsProps = {
  category: PostCategory
  page?: number
}

export type GetNewsResponse = Response<NewsData>

export type FindPostProps = {
  category: PostCategory
  strict?: boolean
  query: string
}

export type FindPostResponse = Response<{ news: PostData | null }>
