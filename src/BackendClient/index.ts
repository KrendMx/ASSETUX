import { handleRequest, constructURL } from "./helpers"
import config from "../config"
import type {
  GetFiatRates,
  GetTokens,
  GetFiatProviders,
  GetBlockchains,
  UrlRequest,
  GetPaymentUrlProps,
  GetPaymentUrl,
  SellTokenCreate,
  SellTokenCreateProps,
  CheckSellOrderProps,
  CheckSellOrder,
  CloseSellOrderProps,
  CloseSellOrder
} from "./types"

class BackendClient {
  private apiKey = ""
  private headers = {}

  public async getFiatRates({ apiHost }: UrlRequest): Promise<GetFiatRates> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/fiatrates`,
      method: "GET",
      headers: this.headers
    })
  }

  public async getTokens({ apiHost }: UrlRequest): Promise<GetTokens> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/tokens`,
      method: "GET",
      headers: this.headers
    })
  }

  public async getFiatProviders({
    apiHost
  }: UrlRequest): Promise<GetFiatProviders> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/fiatproviders`,
      method: "GET",
      headers: this.headers
    })
  }

  public async getBlockchains(): Promise<GetBlockchains> {
    return handleRequest({
      url: `${config.hostProtocol}://bsc.${config.host}/api/blockchains`,
      method: "GET",
      headers: this.headers
    })
  }

  public async getPaymentUrl({
    apiHost,
    ...params
  }: GetPaymentUrlProps): Promise<GetPaymentUrl> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/buytoken/getpaymenturl`,
      method: "POST",
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
      method: "POST",
      headers: this.headers,
      data
    })
  }

  public async checkSellOrder({
    apiHost,
    ...data
  }: CheckSellOrderProps): Promise<CheckSellOrder> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/selltoken/check`,
      method: "POST",
      headers: this.headers,
      data
    })
  }

  public async closeSellOrder({
    apiHost,
    ...data
  }: CloseSellOrderProps): Promise<CloseSellOrder> {
    return handleRequest({
      url: `${constructURL(apiHost)}/api/selltoken/close`,
      method: "POST",
      headers: this.headers,
      data
    })
  }
}

export default new BackendClient()
