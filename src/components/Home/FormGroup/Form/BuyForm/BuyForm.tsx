import React, { useState, useEffect } from "react"

import { useIsomorphicLayoutEffect } from "@/utils/hooks"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setCurrentRate } from "@/redux/cryptoSlice"

import SelectForm from "./SelectForm"
import Step from "./SelectForm/Steps"

import { BackendClient } from "@/backend/clients"

import type { Option } from "@/shared/InputSelect/types"
import type { PaymentOption, TokenOption } from "../types"
import type {
  FiatRate,
  FiatProvider,
  Blockchain,
  Token
} from "@/backend/main/types"
import type { CurrenciesType } from "@/utils/currencies"

type BuyFormProps = {
  currentBlockchain: Blockchain | null
  currentToken: Token | null
  currentCurrency: CurrenciesType
  blockchains: Option[] | null
  currencies: Option[] | null
  tokens: TokenOption[] | null
  rates: FiatRate[] | null
  payments: FiatProvider[] | null
  serviceAvailable: boolean | null
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
  serviceAvailable,
  onTokenChange
}: BuyFormProps) {
  const dispatch = useAppDispatch()

  const [currentStep, setCurrentStep] = useState(Step.Details)
  const [processingRequest, setProcessingRequest] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [giveAmount, setGiveAmount] = useState("10000") // in form it is validated to be a number
  const [getAmount, setGetAmount] = useState("")
  const [email, setEmail] = useState("")
  const [details, setDetails] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [processedPayments, setProcessedPayments] = useState<
    PaymentOption[] | null
  >(null)

  const [cardError, setCardError] = useState("")

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
        email,
        card: selectedPayment == "QIWI" ? phoneNumber : details
      })

      setProcessingRequest(false)

      if (response.state != "success") {
        return
      }

      setCardError("")

      Object.assign(document.createElement("a"), {
        target: "_blank",
        href: response.data.link
      }).click()
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
      const numberGive = Number(giveAmount)

      const rangedPayments = payments.filter(
        (payment) => payment.min <= numberGive && payment.max >= numberGive
      )

      const paymentsToProcess =
        rangedPayments.length == 0 ? payments : rangedPayments

      const processedPayments = paymentsToProcess
        .filter((payment) => payment.currency == selectedCurrency)
        .map((payment) => {
          return {
            value: payment.method,
            description: payment.method,
            min: payment.min,
            max: payment.max,
            icon: `https://${currentBlockchain?.url}${payment.logo}`
          }
        })

      const sortedPayments = processedPayments.sort((a, b) => b.max - a.max)

      setProcessedPayments(sortedPayments)

      if (sortedPayments.length > 0) {
        setSelectedPayment(sortedPayments[0].value)
      } else {
        setSelectedPayment(null)
      }
    }
  }, [selectedCurrency, payments, giveAmount])

  useIsomorphicLayoutEffect(() => {
    if (!selectedPayment && processedPayments && processedPayments.length > 0) {
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
      currentDetails={details}
      currentPhoneNumber={phoneNumber}
      payments={processedPayments}
      currentWallet={walletAddress}
      giveAmount={giveAmount}
      getAmount={getAmount}
      email={email}
      rate={currentRate}
      processingRequest={processingRequest}
      cardError={cardError}
      serviceAvailable={serviceAvailable}
      setCurrentStep={setCurrentStep}
      setGetAmount={setGetAmount}
      onBlockchainChange={(blockchain) => {}}
      onCurrencyChange={setSelectedCurrency}
      onTokenChange={onTokenChange}
      onPaymentChange={setSelectedPayment}
      onWalletChange={setWalletAddress}
      onDetailsChange={setDetails}
      onPhoneChange={setPhoneNumber}
      onGiveAmountChange={setGiveAmount}
      onEmailChange={setEmail}
      onSubmit={onSubmit}
    />
  )
}

export default BuyForm
