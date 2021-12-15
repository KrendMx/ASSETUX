import { handleRequest } from "./helpers"
import type { GetFiatRates, GetTokens, GetFiatProviders } from "./types"

class BackendClient {
  private apiKey = ""
  private headers = {}
  private apiHost = `${process.env.NEXT_PUBLIC_HOST_PROTOCOL}://bsc.${process.env.NEXT_PUBLIC_HOST}`

  public async getFiatRates(): Promise<GetFiatRates> {
    return handleRequest({
      url: `${this.apiHost}/api/fiatrates`,
      method: "GET",
      headers: this.headers
    })
  }

  public async getTokens(): Promise<GetTokens> {
    return handleRequest({
      url: `${this.apiHost}/api/tokens`,
      method: "GET",
      headers: this.headers
    })
  }

  public async getFiatProviders(): Promise<GetFiatProviders> {
    return handleRequest({
      url: `${this.apiHost}/api/fiatproviders`,
      method: "GET",
      headers: this.headers
    })
  }
}

export default new BackendClient()
