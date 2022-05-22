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
  ChangeCompanyResponse,
  LogoutProps
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
    token
  }: GetProfileProps): Promise<GetProfileResponse> {
    return handleRequest({
      url: `${this.genericURL}/ecommerce/user/profile`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async changeWallet({
    wallet,
    token
  }: ChangeWalletProps): Promise<ChangeWalletResponse> {
    return handleRequest({
      url: `${this.genericURL}/ecommerce/user/changeWallet`,
      method: "PATCH",
      data: {
        public_key: wallet
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async changeCompany({
    token,
    ...data
  }: ChangeCompanyProps): Promise<ChangeCompanyResponse> {
    return handleRequest({
      url: `${this.genericURL}/ecommerce/widget/edit`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      },
      data
    })
  }

  public async logout({ token }: LogoutProps) {
    return handleRequest({
      url: `${this.genericURL}/ecommerce/user/logout`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

export default EcommerceClient
