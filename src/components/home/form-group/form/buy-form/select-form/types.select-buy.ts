import Step from './steps'

import type { Option } from '@/components/common/input-select/types.input-select'
import type { PaymentOption } from '../../types.form'

export type Error = {
  [key: string]: string | undefined
}

export type SelectFormProps = {
  currentStep: Step
  currentBlockchain: string | null
  blockchains: Option[] | null
  currentCurrency: string | null
  currencies: Option[] | null
  currentToken: string | null
  tokens: Option[] | null
  currentDetails: string
  currentPhoneNumber: string
  currentPayment: string | null
  payments: PaymentOption[] | null
  currentWallet: string
  giveAmount: string
  getAmount: string
  email: string
  rate: number | null
  processingRequest: boolean
  cardError: string
  serviceAvailable: boolean | null
  setCurrentStep: (step: Step) => void
  setGetAmount: (getAmount: string) => void
  onBlockchainChange: (blockchain: string) => void
  onCurrencyChange: (currency: string) => void
  onTokenChange: (token: string) => void
  onDetailsChange: (details: string) => void
  onPhoneChange: (phone: string) => void
  onPaymentChange: (payment: string) => void
  onWalletChange: (wallet: string) => void
  onGiveAmountChange: (amount: string) => void
  onEmailChange: (email: string) => void
  onSubmit: () => void
}
