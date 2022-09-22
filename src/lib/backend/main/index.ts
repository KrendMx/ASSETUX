import { constructURL } from '../helpers'
import Client from '../client'
import handleRequest from '@/core/backend/handle-request'

import type { UrlRequest, Abortable } from '@/core/backend/types'
import type {
  GetFiatRates,
  GetTokens,
  GetFiatProviders,
  GetBlockchains,
  GetPaymentUrlProps,
  GetPaymentUrl,
  SellTokenCreate,
  SellTokenCreateProps,
  CheckSellOrderProps,
  CheckSellOrder,
  CloseSellOrderProps,
  CloseSellOrder,
  RefundRequestProps,
  RefundRequestResponse,
  RefundProps,
  RefundResponse,
  RequestOrdersProps,
  RequestOrdersResponse,
  GetRefundAmountsProps,
  GetRefundAmountsResponse,
  RequestOrdersEmailProps,
  RequestOrdersEmailResponse,
  GetEmailOrdersProps,
  GetEmailOrdersResponse,
  CheckLiquidityProps,
  CheckLiquidityResponse,
  GetNewsProps,
  GetNewsResponse,
  FindPostProps,
  FindPostResponse,
  CreateFeedbackProps,
  GetTokensProps
} from './types.backend.main'

class BackendClient extends Client {
  private apiKey = ''
  private headers = {}

  public constructor() {
    super()
  }

  public async getFiatRates({
    apiHost,
    signal
  }: UrlRequest & Abortable): Promise<GetFiatRates> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/fiatrates`,
      method: 'GET',
      headers: this.headers,
      signal
    })
  }

  public async getTokens({
    apiHost,
    signal,
    type
  }: UrlRequest & Abortable & GetTokensProps): Promise<GetTokens> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/tokens?type=${type}`,
      method: 'GET',
      headers: this.headers,
      signal
    })
  }

  public async getFiatProviders({
    apiHost,
    signal
  }: UrlRequest & Abortable): Promise<GetFiatProviders> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/fiatproviders`,
      method: 'GET',
      headers: this.headers,
      signal
    })
  }

  public async getBlockchains(signal?: AbortSignal): Promise<GetBlockchains> {
    return handleRequest({
      url: `${this.genericURL}/api/blockchains`,
      method: 'GET',
      headers: this.headers,
      signal
    })
  }

  public async getPaymentUrl({
    apiHost,
    ...params
  }: GetPaymentUrlProps): Promise<GetPaymentUrl> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/buytoken/getpaymenturl`,
      method: 'POST',
      headers: this.headers,
      data: params
    })
  }

  public async createSellTokenOrder({
    apiHost,
    ...data
  }: SellTokenCreateProps): Promise<SellTokenCreate> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/selltoken/create`,
      method: 'POST',
      headers: this.headers,
      data
    })
  }

  public async checkSellOrder({
    apiHost,
    signal,
    ...data
  }: CheckSellOrderProps & Abortable): Promise<CheckSellOrder> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/selltoken/check`,
      method: 'POST',
      headers: this.headers,
      data,
      signal
    })
  }

  public async closeSellOrder({
    apiHost,
    ...data
  }: CloseSellOrderProps): Promise<CloseSellOrder> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/selltoken/close`,
      method: 'POST',
      headers: this.headers,
      data
    })
  }

  public async refundRequest({
    apiHost,
    orderId
  }: RefundRequestProps): Promise<RefundRequestResponse> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/selltoken/refund/request`,
      method: 'GET',
      headers: this.headers,
      params: {
        orderId
      }
    })
  }

  public async refund({
    apiHost,
    ...data
  }: RefundProps): Promise<RefundResponse> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/selltoken/refund`,
      method: 'POST',
      headers: this.headers,
      data
    })
  }

  public async requestOrdersWithEmail({
    apiHost,
    email
  }: RequestOrdersProps): Promise<RequestOrdersResponse> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/selltoken/refund`,
      method: 'GET',
      headers: this.headers,
      params: {
        email
      }
    })
  }

  public async getRefundAmounts({
    apiHost,
    chainId
  }: GetRefundAmountsProps): Promise<GetRefundAmountsResponse> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/selltoken/refund/amounts`,
      method: 'GET',
      headers: this.headers,
      params: {
        chainId
      }
    })
  }

  public async requestOrdersEmail({
    apiHost,
    email
  }: RequestOrdersEmailProps): Promise<RequestOrdersEmailResponse> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/orders/request`,
      method: 'GET',
      headers: this.headers,
      params: {
        email
      }
    })
  }

  public async getEmailOrders({
    apiHost,
    email,
    code,
    signal
  }: GetEmailOrdersProps & Abortable): Promise<GetEmailOrdersResponse> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/orders`,
      method: 'GET',
      headers: this.headers,
      params: {
        email,
        code
      },
      signal
    })
  }

  public async checkLiquidity({
    apiHost,
    chainId,
    signal
  }: CheckLiquidityProps & Abortable): Promise<CheckLiquidityResponse> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/liquidity`,
      method: 'GET',
      headers: this.headers,
      params: {
        chainId
      },
      signal
    })
  }

  public async getNews({
    category,
    page,
    lang
  }: GetNewsProps): Promise<GetNewsResponse> {
    return handleRequest({
      url: `${this.genericURL}/api/blog/${category}`,
      method: 'GET',
      headers: this.headers,
      params: {
        page,
        lang
      }
    })
  }

  public async findPost({
    category,
    query,
    strict,
    lang,
    signal
  }: FindPostProps & Abortable): Promise<FindPostResponse> {
    return handleRequest({
      url: `${this.genericURL}/api/blog/${category}/find`,
      method: 'GET',
      headers: this.headers,
      signal,
      params: { query, strict, lang }
    })
  }

  public async createFeedback({
    apiHost,
    signal,
    ...data
  }: CreateFeedbackProps & Abortable) {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/selltoken/createFeedback`,
      method: 'POST',
      headers: this.headers,
      signal,
      data
    })
  }
}

export default BackendClient
