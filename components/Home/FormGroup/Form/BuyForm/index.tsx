import React, { useState, useEffect, useMemo } from "react"
import CurrencyForm from "./CurrencyForm"
import { useAppSelector } from "@/src/redux/hooks"
import type { Option } from "../InputSelect/types"
import type { PaymentOption } from "../types"
import type { FiatRate, FiatProvider } from "@/src/BackendClient/types"

type BuyFormProps = {
  blockchains: Option[] | null
  currencies: Option[] | null
  tokens: Option[] | null
  rates: FiatRate[] | null
  payments: FiatProvider[] | null
  firstLoad: boolean
}

function BuyForm({
  blockchains,
  currencies,
  tokens,
  rates,
  payments,
  firstLoad
}: BuyFormProps) {
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(
    null
  )
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [userInput, setUserInput] = useState("10000")
  const [processedPayments, setProcessedPayments] = useState<
    PaymentOption[] | null
  >(null)
  const currentRate = useMemo(() => {
    if (rates && selectedToken && selectedCurrency) {
      const rate = rates.find((rate) => rate.name == selectedToken)
      if (rate) {
        return rate.buy[selectedCurrency]
      }

      return null
    }

    return null
  }, [rates, selectedToken, selectedCurrency])
  const defaultCurrencyIndex = currencies
    ? currencies.findIndex((currency) => currency.value == currentCurrency)
    : 0

  useEffect(() => {
    if (!selectedBlockchain && blockchains) {
      setSelectedBlockchain(blockchains[0].value)
    }
  }, [blockchains, selectedBlockchain])

  useEffect(() => {
    setSelectedCurrency(currentCurrency)
  }, [currentCurrency])

  useEffect(() => {
    if (!selectedToken && tokens) {
      setSelectedToken(tokens[0].value)
    }
  }, [tokens, selectedToken])

  useEffect(() => {
    if (selectedCurrency && payments) {
      setProcessedPayments(
        payments
          .filter((payment) => payment.currency == selectedCurrency)
          .map((payment) => {
            return {
              value: payment.method,
              description: payment.method,
              min: payment.min,
              max: payment.max
            }
          })
      )
    }
  }, [selectedCurrency, payments])

  useEffect(() => {
    if (!selectedPayment && processedPayments) {
      setSelectedPayment(processedPayments[0].value)
    }
  }, [processedPayments, selectedPayment])

  return (
    <CurrencyForm
      defaultBlockchain={0}
      blockchains={blockchains}
      defaultCurrency={defaultCurrencyIndex == -1 ? 0 : defaultCurrencyIndex}
      currentCurrency={selectedCurrency}
      currencies={currencies}
      defaultToken={0}
      currentToken={selectedToken}
      tokens={tokens}
      rate={currentRate}
      userInput={userInput}
      setUserInput={setUserInput}
      payments={processedPayments}
      defaultPayment={0}
      onPaymentChange={(payment) => setSelectedPayment(payment)}
      onBlockchainChange={(blockchain) => setSelectedBlockchain(blockchain)}
      onCurrencyChange={(currency) => setSelectedCurrency(currency)}
      onTokenChange={(token) => setSelectedToken(token)}
      firstLoad={firstLoad}
    />
  )
}

export default BuyForm
