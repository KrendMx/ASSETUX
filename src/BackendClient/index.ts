import { handleRequest, constructURL } from "./helpers"
import type {
  GetFiatRates,
  GetTokens,
  GetFiatProviders,
  GetBlockchains,
  UrlRequest,
  GetPaymentUrlProps
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
      url: `${process.env.NEXT_PUBLIC_HOST_PROTOCOL}://bsc.${process.env.NEXT_PUBLIC_HOST}/api/blockchains`,
      method: "GET",
      headers: this.headers
    })
  }

  public async getPaymentUrl({
    apiHost,
    ...params
  }: GetPaymentUrlProps): Promise<void> {
    console.log(
      await handleRequest({
        url: `${constructURL(apiHost)}/api/buytoken/getpaymenturl`,
        method: "POST",
        headers: this.headers,
        data: params
      })
    )
  }
}

export default new BackendClient()
