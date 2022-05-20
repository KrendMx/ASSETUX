import { handleRequest } from "../helpers"
import Client from "../client"

import type {
  GetProfileProps,
  GetProfileResponse,
  LoginProps,
  LoginResponse,
  ChangeWalletProps,
  ChangeWalletResponse,
  ChangeCompanyProps,
  ChangeCompanyResponse
} from "./types"

class EcommerceClient extends Client {
  public constructor() {
    super()
  }

  public async login({ token }: LoginProps): Promise<LoginResponse> {
    return handleRequest({
      url: `${this.genericURL}/ecommerce/user/login`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async getProfile({
    tokenCookie
  }: GetProfileProps): Promise<GetProfileResponse> {
    return handleRequest({
      url: `${this.genericURL}/ecommerce/user/profile`,
      method: "GET",
      withCredentials: true,
      headers: {
        Cookie: "ecommerce_token=" + tokenCookie
      }
    })
  }

  public async changeWallet({
    wallet
  }: ChangeWalletProps): Promise<ChangeWalletResponse> {
    return handleRequest({
      url: `${this.genericURL}/ecommerce/user/changeWallet`,
      method: "PATCH",
      withCredentials: true,
      data: {
        public_key: wallet
      }
    })
  }

  public async changeCompany(
    data: ChangeCompanyProps
  ): Promise<ChangeCompanyResponse> {
    return handleRequest({
      url: `${this.genericURL}/ecommerce/widget/edit`,
      method: "PATCH",
      withCredentials: true,
      data
    })
  }
}

export default EcommerceClient
