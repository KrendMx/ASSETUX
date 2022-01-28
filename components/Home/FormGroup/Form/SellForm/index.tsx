import React, { useState, useEffect } from "react"
import { useIsomorphicLayoutEffect } from "@/src/hooks"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { setCurrentRate } from "@/src/redux/cryptoSlice"
import SelectForm from "./SelectForm"
import BackendClient from "@/src/BackendClient"
import type { Option } from "../InputSelect/types"
import type { PaymentOption, TokenOption } from "../types"
import type {
  FiatRate,
  FiatProvider,
  Blockchain,
  Token
} from "@/src/BackendClient/types"
import type { CurrenciesType } from "@/src/currencies"

type SellFormProps = {
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

function SellForm({
  currentBlockchain,
  currentToken,
  currentCurrency,
  blockchains,
  currencies,
  tokens,
  rates,
  payments,
  onTokenChange
}: SellFormProps) {
  const dispatch = useAppDispatch()

  const [processingRequest, setProcessingRequest] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [giveAmount, setGiveAmount] = useState("10000") // in form it is validated to be a number
  const [email, setEmail] = useState("")
  const [details, setDetails] = useState("")
  const [holder, setHolder] = useState("")
  const [processedPayments, setProcessedPayments] = useState<
    PaymentOption[] | null
  >(null)

  const currentRate = useAppSelector((state) => state.crypto.currentRate)

  const onSubmit = async () => {
    if (
      currentBlockchain &&
      currentToken &&
      selectedCurrency &&
      selectedPayment
    ) {
      setProcessingRequest(true)

      const response = await BackendClient.createSellTokenOrder({
        apiHost: currentBlockchain.url,
        cur_in: {
          address: currentToken.address,
          chain_id: currentBlockchain.chain_id,
          decimals: currentToken.decimals,
          symbol: currentToken.symbol
        },
        cur_out: {
          currency: selectedCurrency,
          pan: Number(details),
          holder,
          type: selectedPayment
        },
        email
      })

      setProcessingRequest(false)

      console.log(response)
    }
  }

  useIsomorphicLayoutEffect(() => {
    setSelectedCurrency(currentCurrency)
  }, [currentCurrency])

  useIsomorphicLayoutEffect(() => {
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

  useIsomorphicLayoutEffect(() => {
    if (!selectedPayment && processedPayments) {
      setSelectedPayment(processedPayments[0].value)
    }
  }, [processedPayments, selectedPayment])

  useEffect(() => {
    if (rates && currentToken && selectedCurrency) {
      const rate = rates.find((rate) => rate.name == currentToken.symbol)

      let sellRate: number | null = null

      if (rate) {
        sellRate = rate.sell[selectedCurrency]
      }

      dispatch(setCurrentRate(sellRate))
    }
  }, [rates, currentToken, selectedCurrency, dispatch])

  return (
    <SelectForm
      currentBlockchain={currentBlockchain && currentBlockchain.title}
      blockchains={blockchains}
      currentCurrency={selectedCurrency}
      currencies={currencies}
      currentToken={currentToken && currentToken.symbol}
      tokens={tokens}
      currentPayment={selectedPayment}
      payments={processedPayments}
      currentDetails={details}
      currentHolder={holder}
      currentEmail={email}
      giveAmount={giveAmount}
      rate={currentRate}
      processingRequest={processingRequest}
      onBlockchainChange={(blockchain) => {}}
      onCurrencyChange={setSelectedCurrency}
      onTokenChange={onTokenChange}
      onPaymentChange={setSelectedPayment}
      onDetailsChange={setDetails}
      onHolderChange={setHolder}
      onEmailChange={setEmail}
      onGiveAmountChange={setGiveAmount}
      onSubmit={onSubmit}
    />
  )
}

export default SellForm
