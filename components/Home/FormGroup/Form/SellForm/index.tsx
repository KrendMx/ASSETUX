import React, { useState, useEffect } from "react"
import { useIsomorphicLayoutEffect } from "@/src/hooks"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { setCurrentRate } from "@/src/redux/cryptoSlice"
import SelectForm from "./SelectForm"
import BackendClient from "@/src/BackendClient"
import { Step } from "./SelectForm/Steps"
import type { Option } from "../InputSelect/types"
import type { PaymentOption, TokenOption } from "../types"
import {
  FiatRate,
  FiatProvider,
  Blockchain,
  Token
} from "@/src/BackendClient/types"
import type { ExchangeInfo } from "./SelectForm/types"
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

  const [currentStep, setCurrentStep] = useState(Step.Details)
  const [processingRequest, setProcessingRequest] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [giveAmount, setGiveAmount] = useState("1") // in form it is validated to be a number
  const [email, setEmail] = useState("")
  const [details, setDetails] = useState("")
  const [holder, setHolder] = useState("")
  const [processedPayments, setProcessedPayments] = useState<
    PaymentOption[] | null
  >(null)
  const [exchangeInfo, setExchangeInfo] = useState<ExchangeInfo | null>(null)
  const [refundRequestError, setRefundRequestError] = useState<{
    result: string | null
    isLoading: boolean
  } | null>(null)
  const [refundError, setRefundError] = useState<{
    result: string | null
    isLoading: boolean
  } | null>(null)

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
          pan: details,
          holder,
          type: selectedPayment
        },
        email,
        totalAmount: Number(giveAmount)
      })

      setProcessingRequest(false)
      if (response.data && typeof response.data.result != "string") {
        const data = response.data.result
        setExchangeInfo({
          wallet: data.wallet,
          creditedAmount: 0,
          timestamp: data.end,
          orderId: data.orderId.toString()
        })
        setCurrentStep(Step.Exchange)
      }
    }
  }

  const onExchange = async () => {
    if (currentBlockchain && exchangeInfo) {
      setProcessingRequest(true)

      const response = await BackendClient.closeSellOrder({
        apiHost: currentBlockchain.url,
        orderId: exchangeInfo.orderId
      })

      setProcessingRequest(false)
    }
  }

  const onRefund = async (code: string, wallet: string) => {
    if (currentBlockchain && exchangeInfo) {
      setRefundError({
        isLoading: true,
        result: null
      })

      const response = await BackendClient.refund({
        apiHost: currentBlockchain.url,
        orderId: exchangeInfo.orderId,
        code: Number(code),
        wallet
      })

      if (response.data?.error && response.data.result) {
        setRefundError({
          isLoading: false,
          result: response.data.result
        })
      } else {
        setRefundError({
          isLoading: false,
          result: null
        })
      }
    }
  }

  const onRefundRequest = async () => {
    if (currentBlockchain && exchangeInfo) {
      setRefundRequestError({
        isLoading: true,
        result: null
      })

      const response = await BackendClient.refundRequest({
        apiHost: currentBlockchain.url,
        orderId: exchangeInfo.orderId
      })

      if (response.data?.error && response.data?.result) {
        setRefundRequestError({
          isLoading: false,
          result: response.data.result
        })
      } else {
        setRefundRequestError({
          isLoading: false,
          result: null
        })
      }
    }
  }

  useIsomorphicLayoutEffect(() => {
    setSelectedCurrency(currentCurrency)
  }, [currentCurrency])

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

      let sellRate: number | null = null

      if (rate) {
        sellRate = rate.sell[selectedCurrency]
      }

      dispatch(setCurrentRate(sellRate))
    }
  }, [rates, currentToken, selectedCurrency, dispatch])

  useEffect(() => {
    if (currentStep == Step.Exchange && exchangeInfo && currentBlockchain) {
      const interval = setInterval(async () => {
        const response = await BackendClient.checkSellOrder({
          apiHost: currentBlockchain.url,
          orderId: exchangeInfo.orderId
        })

        if (response.data && typeof response.data.result != "string") {
          const data = response.data.result
          setExchangeInfo({
            ...exchangeInfo,
            creditedAmount: data.amountIn
          })
        }
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [currentStep, exchangeInfo, currentBlockchain])

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
      exchangeInfo={exchangeInfo}
      currentStep={currentStep}
      processingRequest={processingRequest}
      refundRequestError={refundRequestError}
      refundError={refundError}
      onBlockchainChange={(blockchain) => {}}
      onCurrencyChange={setSelectedCurrency}
      onTokenChange={onTokenChange}
      onPaymentChange={setSelectedPayment}
      onDetailsChange={setDetails}
      onHolderChange={setHolder}
      onEmailChange={setEmail}
      onGiveAmountChange={setGiveAmount}
      onSubmit={onSubmit}
      setCurrentStep={setCurrentStep}
      onExchange={onExchange}
      onRefund={onRefund}
      onRefundRequest={onRefundRequest}
    />
  )
}

export default SellForm
