import type { UrlRequest, Abortable } from '@/core/backend/types.core.backend'
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
  GetTokensProps,
  GetFiatRateByToken,
  GetCardNumberValidationProps,
  GetCardNumberValidationResult
} from './types.backend.main'
import { api } from '@/core/backend/handle-request'
import { constructURL } from '@/lib/helpers.global'
import { CurrenciesType } from '@/lib/data/currencies'

export class BackendClient {
  public async getFiatRates({
    apiHost,
    signal
  }: UrlRequest & Abortable): Promise<GetFiatRates> {
    return api.get(`${constructURL(apiHost)}/api/fiatrates`, {
      signal
    })
  }

  public async getFiatRateByToken({
    signal,
    token
  }: Abortable & { token: string }): Promise<GetFiatRateByToken> {
    return api.get(`/api/fiatrates/${token}`, {
      signal
    })
  }

  public async getTokens({
    apiHost,
    signal,
    type
  }: UrlRequest & Abortable & GetTokensProps): Promise<GetTokens> {
    return api.get(`${apiHost}/api/tokens?type=${type}`, {
      signal
    })
  }

  public async getFiatProviders({
    apiHost,
    signal
  }: UrlRequest & Abortable): Promise<GetFiatProviders> {
    return api.get(`${apiHost}/api/fiatproviders`, {
      signal
    })
  }

  public async getBlockchains(signal?: AbortSignal): Promise<GetBlockchains> {
    return api.get(`/api/blockchains`, {
      signal
    })
  }

  public async getPaymentUrl({
    apiHost,
    ...params
  }: GetPaymentUrlProps): Promise<GetPaymentUrl> {
    return api.post(
      `${constructURL(apiHost)}/api/buytoken/getpaymenturl`,
      params
    )
  }

  public async createSellTokenOrder({
    apiHost,
    ...data
  }: SellTokenCreateProps): Promise<SellTokenCreate> {
    return api.post(`${constructURL(apiHost)}/api/selltoken/create`, data)
  }

  public async checkSellOrder({
    apiHost,
    signal,
    ...data
  }: CheckSellOrderProps & Abortable): Promise<CheckSellOrder> {
    return api.post(`${constructURL(apiHost)}/api/selltoken/check`, data, {
      signal
    })
  }

  public async closeSellOrder({
    apiHost,
    ...data
  }: CloseSellOrderProps): Promise<CloseSellOrder> {
    return api.post(`${constructURL(apiHost)}/api/selltoken/close`, data)
  }

  public async refundRequest({
    apiHost,
    orderId
  }: RefundRequestProps): Promise<RefundRequestResponse> {
    return api.get(`${constructURL(apiHost)}/api/selltoken/refund/request`, {
      params: {
        orderId
      }
    })
  }

  public async refund({
    apiHost,
    ...data
  }: RefundProps): Promise<RefundResponse> {
    return api.post(`${constructURL(apiHost)}/api/selltoken/refund`, data)
  }

  public async requestOrdersWithEmail({
    apiHost,
    email
  }: RequestOrdersProps): Promise<RequestOrdersResponse> {
    return api.get(`${constructURL(apiHost)}/api/selltoken/refund`, {
      params: {
        email
      }
    })
  }

  public async getRefundAmounts({
    apiHost,
    chainId
  }: GetRefundAmountsProps): Promise<GetRefundAmountsResponse> {
    return api.get(`${constructURL(apiHost)}/api/selltoken/refund/amounts`, {
      params: {
        chainId
      }
    })
  }

  public async requestOrdersEmail({
    apiHost,
    email
  }: RequestOrdersEmailProps): Promise<RequestOrdersEmailResponse> {
    return api.get(`${constructURL(apiHost)}/api/orders/request`, {
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
    return api.get(`${constructURL(apiHost)}/api/orders`, {
      params: {
        email,
        code
      },
      signal
    })
  }

  public async checkCardValidation({
    bin,
    currency
  }: {
    bin: string
    currency: CurrenciesType
  }): Promise<any> {
    return api.get(`/api/buytoken/check_card`, {
      params: {
        bin,
        currency
      }
    })
  }

  public async checkLiquidity({
    apiHost,
    chainId,
    signal
  }: CheckLiquidityProps & Abortable): Promise<CheckLiquidityResponse> {
    return api.get(`${constructURL(apiHost)}/api/liquidity`, {
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
    return api.get(`/api/blog/${category}`, {
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
    return api.get(`/api/blog/${category}/find`, {
      signal,
      params: { query, strict, lang }
    })
  }

  public async createFeedback({
    apiHost,
    signal,
    ...data
  }: CreateFeedbackProps & Abortable) {
    return api.post(
      `${constructURL(apiHost)}/api/selltoken/createFeedback`,
      data,
      {
        signal
      }
    )
  }
}
