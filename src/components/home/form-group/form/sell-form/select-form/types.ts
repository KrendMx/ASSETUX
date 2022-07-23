import { Step } from "./steps"

import type { RequestState } from "@/core/backend/types"
import type { PaymentOption } from "../../types"
import type { Option } from "@/components/common/input-select/types"

export type Error = {
  [key: string]: string | undefined
}

export type ExchangeInfo = {
  wallet: string
  timestamp: string
  creditedAmount: number
  totalAmount: number
  orderId: string
  curIn: string
  curOut: string
}

export type SelectFormProps = {
  loadingOrder: boolean
  processingRequest: boolean
  currentBlockchain: string | null
  blockchains: Option[] | null
  currentCurrency: string | null
  currencies: Option[] | null
  currentToken: string | null
  tokens: Option[] | null
  currentPayment: string | null
  payments: PaymentOption[] | null
  currentDetails: string
  currentHolder: string
  currentEmail: string
  giveAmount: string
  rate: number | null
  exchangeInfo: ExchangeInfo | null
  currentStep: Step
  depositInfo: RequestState<string> | null
  serviceAvailable: boolean | null
  refundRequestInfo: RequestState<string> | null
  refundInfo: RequestState<string> | null
  onBlockchainChange: (blockchain: string) => void
  onCurrencyChange: (currency: string) => void
  onTokenChange: (token: string) => void
  onPaymentChange: (payment: string) => void
  onDetailsChange: (details: string) => void
  onHolderChange: (holder: string) => void
  onEmailChange: (email: string) => void
  onGiveAmountChange: (amount: string) => void
  onSubmit: () => void
  setCurrentStep: (step: Step) => void
  onExchange: () => void
  onRefund: (code: string, wallet: string) => void
  onRefundRequest: () => void
  getRefundAmounts: () => Promise<number | null>
  onReview: (review: string) => void
}
