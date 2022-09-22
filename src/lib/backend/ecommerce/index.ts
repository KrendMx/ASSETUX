import Client from "../client"
import handleRequest from "@/core/backend/handle-request"

import type {
  GetProfileProps,
  GetProfileResponse,
  LoginProps,
  LoginResponse,
  ChangeWalletProps,
  ChangeWalletResponse,
  ChangeCompanyProps,
  ChangeCompanyResponse,
  LogoutProps,
  GetHistoryProps,
  GetHistoryResponse,
  CreateBillProps,
  CreateBillResponse,
  GetBillResponse,
  ICreatePaymentProps,
  CreatePaymentResponse,
  MerchantBillResponse
} from "./types.backend.ecommerce"
import { CurrenciesType } from "@/lib/data/currencies"
import { ActionType } from "@/lib/redux/crypto/types"

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

  public async getHistory({
    token
  }: GetHistoryProps): Promise<GetHistoryResponse> {
    return handleRequest({
      url: `${this.genericURL}/ecommerce/payment/gets`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async createBill({
    token,
    ...data
  }: CreateBillProps): Promise<CreateBillResponse> {
    return handleRequest({
      url: `${this.genericURL}/ecommerce/bill/create`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      data
    })
  }

  public async getBill(id: string): Promise<GetBillResponse> {
    return handleRequest({
      url: `${this.genericURL}/ecommerce/bill/get`,
      method: "GET",
      params: { id }
    })
  }

  public async createPayment(
    data: ICreatePaymentProps
  ): Promise<CreatePaymentResponse> {
    return handleRequest({
      url: `${this.genericURL}/ecommerce/payment/create`,
      method: "POST",
      data
    })
  }

  public async getMerchantToken(token: string): Promise<MerchantBillResponse> {
    return handleRequest({
      url: `${this.genericURL}/ecommerce/merchant/listing/${token}`,
      method: "GET"
    })
  }

  public async calcFee(
    amount: number,
    currency: CurrenciesType,
    method: ActionType,
    reverseCalc: boolean
  ) {
    return handleRequest({
      url: `${this.genericURL}/api/buytoken/calc_fee?amount=${amount}&currency=${currency}&reverseCalc=${reverseCalc}&method=${method}`,
      method: "GET"
    })
  }
}

export default EcommerceClient
