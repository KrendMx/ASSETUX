import React, { useState, useEffect } from "react"
import { useIsomorphicLayoutEffect } from "@/src/hooks"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { setCurrentRate } from "@/src/redux/cryptoSlice"
import SelectForm from "./SelectForm"
import BackendClient from "@/src/BackendClient"
import Step from "./SelectForm/Steps"
import type { Option } from "@/shared/InputSelect/types"
import type { PaymentOption, TokenOption } from "../types"
import type {
  FiatRate,
  FiatProvider,
  Blockchain,
  Token
} from "@/src/BackendClient/types"
import type { CurrenciesType } from "@/src/currencies"

type BuyFormProps = {
  currentBlockchain: Blockchain | null
  currentToken: Token | null
  currentCurrency: CurrenciesType
  blockchains: Option[] | null
  currencies: Option[] | null
  tokens: TokenOption[] | null
  rates: FiatRate[] | null
  payments: FiatProvider[] | null
  onTokenChange: (token: string) => void
}

function BuyForm({
  currentBlockchain,
  currentToken,
  currentCurrency,
  blockchains,
  currencies,
  tokens,
  rates,
  payments,
  onTokenChange
}: BuyFormProps) {
  const dispatch = useAppDispatch()

  const [currentStep, setCurrentStep] = useState(Step.Details)
  const [processingRequest, setProcessingRequest] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [giveAmount, setGiveAmount] = useState("10000") // in form it is validated to be a number
  const [email, setEmail] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [processedPayments, setProcessedPayments] = useState<
    PaymentOption[] | null
  >(null)

  const currentRate = useAppSelector((state) => state.crypto.currentRate)

  const onSubmit = async () => {
    if (
      currentBlockchain &&
      currentToken &&
      selectedPayment &&
      selectedCurrency
    ) {
      setProcessingRequest(true)
      const tokenAddress = currentToken.address

      const response = await BackendClient.getPaymentUrl({
        apiHost: currentBlockchain.url,
        ticker: selectedCurrency,
        provider: selectedPayment,
        amount: Number(giveAmount),
        cryptoAddress: walletAddress,
        chainId: currentBlockchain.chain_id,
        tokenAddress,
        email
      })

      setProcessingRequest(false)

      if (response.data) {
        window.location.assign(response.data.url)
      }
    }
  }

  useIsomorphicLayoutEffect(() => {
    setSelectedCurrency(currentCurrency)
  }, [currentCurrency])

  useEffect(() => {
    if (currentStep != Step.Details) {
      setCurrentStep(Step.Details)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCurrency, currentToken])

  useIsomorphicLayoutEffect(() => {
    if (selectedCurrency && payments) {
      const processedPayments = payments
        .filter((payment) => payment.currency == selectedCurrency)
        .map((payment) => {
          return {
            value: payment.method,
            description: payment.method,
            min: payment.min,
            max: payment.max
          }
        })

      setProcessedPayments(processedPayments)

      if (processedPayments.length > 0) {
        setSelectedPayment(processedPayments[0].value)
      } else {
        setSelectedPayment(null)
      }
    }
  }, [selectedCurrency, payments])

  useIsomorphicLayoutEffect(() => {
    if (!selectedPayment && processedPayments) {
      setSelectedPayment(processedPayments[0].value)
    }
  }, [processedPayments, selectedPayment])

  useEffect(() => {
    if (rates && currentToken && selectedCurrency) {
      const rate = rates.find((rate) => rate.name == currentToken.symbol)

      let buyRate: number | null = null

      if (rate) {
        buyRate = rate.buy[selectedCurrency]
      }

      dispatch(setCurrentRate(buyRate))
    }
  }, [rates, currentToken, selectedCurrency, dispatch])

  return (
    <SelectForm
      currentStep={currentStep}
      currentBlockchain={currentBlockchain && currentBlockchain.title}
      blockchains={blockchains}
      currentCurrency={selectedCurrency}
      currencies={currencies}
      currentToken={currentToken && currentToken.symbol}
      tokens={tokens}
      currentPayment={selectedPayment}
      payments={processedPayments}
      currentWallet={walletAddress}
      giveAmount={giveAmount}
      email={email}
      rate={currentRate}
      processingRequest={processingRequest}
      setCurrentStep={setCurrentStep}
      onBlockchainChange={(blockchain) => {}}
      onCurrencyChange={setSelectedCurrency}
      onTokenChange={onTokenChange}
      onPaymentChange={setSelectedPayment}
      onWalletChange={setWalletAddress}
      onGiveAmountChange={setGiveAmount}
      onEmailChange={setEmail}
      onSubmit={onSubmit}
    />
  )
}

export default BuyForm
