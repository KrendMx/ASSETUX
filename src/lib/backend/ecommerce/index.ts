import { api } from '@/core/backend/handle-request'

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
  MerchantBillResponse,
  TokenBalanceResponse,
  CalcFeeResponse
} from './types.backend.ecommerce'
import { CurrenciesType } from '@/lib/data/currencies'
import { ActionType } from '@/lib/redux/crypto/types.crypto'

export class EcommerceClient {
  public async login({ token }: LoginProps): Promise<LoginResponse> {
    return api.post(`/ecommerce/user/login`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async getProfile({
    token
  }: GetProfileProps): Promise<GetProfileResponse> {
    return api.get(`/ecommerce/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async changeWallet({
    wallet,
    token
  }: ChangeWalletProps): Promise<ChangeWalletResponse> {
    return api.patch(
      `/ecommerce/user/changeWallet`,
      {
        public_key: wallet
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  public async changeCompany({
    token,
    ...data
  }: ChangeCompanyProps): Promise<ChangeCompanyResponse> {
    return api.patch(`/ecommerce/widget/edit`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async logout({ token }: LogoutProps) {
    return api.post(`/ecommerce/user/logout`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async getHistory({
    token
  }: GetHistoryProps): Promise<GetHistoryResponse> {
    return api.get(`/ecommerce/payment/gets`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async createBill({
    token,
    ...data
  }: CreateBillProps): Promise<CreateBillResponse> {
    return api.post(`/ecommerce/bill/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  public async getBill(id: string): Promise<GetBillResponse> {
    return api.get(`/ecommerce/bill/get?id=${id}`)
  }

  public async createPayment(
    data: ICreatePaymentProps
  ): Promise<CreatePaymentResponse> {
    return api.post(`/ecommerce/payment/create`, data)
  }

  public async getMerchantToken(token: string): Promise<MerchantBillResponse> {
    return api.get(`/ecommerce/merchant/listing/${token}`)
  }

  public async calcFee(
    amount: number,
    currency: CurrenciesType,
    method: ActionType,
    reverseCalc: boolean,
    token: string,
    tokenAddress?: string
  ): Promise<CalcFeeResponse> {
    return api.get(
      `/ecommerce/bill/calc_fee?amount=${amount}
      &currency=${currency}&reverseCalc=${reverseCalc}
      &method=${method}
      &tokenAddress=${tokenAddress}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  public async checkBalanceOfToken(
    tokenSymbol: string
  ): Promise<TokenBalanceResponse> {
    return api.get(`ecommerce/merchant/checkavailable/${tokenSymbol}`)
  }
}
