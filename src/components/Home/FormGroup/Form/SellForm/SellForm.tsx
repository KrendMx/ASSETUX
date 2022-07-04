import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { useIsomorphicLayoutEffect } from "@/utils/hooks"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setCurrentRate, setSellOrderId } from "@/redux/crypto"

import SelectForm from "./SelectForm"
import { BackendClient } from "@/backend/clients"
import { Step } from "./SelectForm/Steps"

import type { Option } from "@/shared/InputSelect/types"
import type { PaymentOption, TokenOption } from "../types"
import type {
  FiatRate,
  FiatProvider,
  Blockchain,
  Token
} from "@/backend/main/types"
import type { RequestState } from "@/backend/types"
import type { ExchangeInfo } from "./SelectForm/types"
import type { CurrenciesType } from "@/utils/currencies"

type SellFormProps = {
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

function SellForm({
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
}: SellFormProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(Step.Details)
  const [loadingOrder, setLoadingOrder] = useState(false) // used to indicate a loading state if there's an id in query
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
  const [refundRequestInfo, setRefundRequestInfo] =
    useState<RequestState<string> | null>(null)
  const [refundInfo, setRefundInfo] = useState<RequestState<string> | null>(
    null
  )
  const [depositInfo, setDepositInfo] = useState<RequestState<string> | null>(
    null
  )

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

      if (response.state == "success") {
        const data = response.data.result

        setExchangeInfo({
          wallet: data.wallet,
          creditedAmount: 0,
          timestamp: data.end,
          orderId: data.orderId.toString()
        })

        setCurrentStep(Step.Exchange)

        dispatch(setSellOrderId(data.orderId.toString()))
      }
    }
  }

  const onExchange = async () => {
    if (currentBlockchain && exchangeInfo) {
      setDepositInfo({
        state: "pending"
      })

      const response = await BackendClient.closeSellOrder({
        apiHost: currentBlockchain.url,
        orderId: exchangeInfo.orderId
      })

      if (response.state == "success") {
        setDepositInfo({
          state: "success",
          result: response.data.result
        })
      }
    }
  }

  const onRefund = async (code: string, wallet: string) => {
    if (currentBlockchain && exchangeInfo) {
      setRefundInfo({
        state: "pending"
      })

      const response = await BackendClient.refund({
        apiHost: currentBlockchain.url,
        orderId: exchangeInfo.orderId,
        code: Number(code),
        wallet
      })

      if (response.state == "success") {
        setRefundInfo({
          state: "success",
          result: response.data.result
        })
      } else {
        setRefundInfo({
          state: "error",
          error: true
        })
      }
    }
  }

  const onRefundRequest = async () => {
    if (currentBlockchain && exchangeInfo) {
      setRefundRequestInfo({
        state: "pending"
      })

      const response = await BackendClient.refundRequest({
        apiHost: currentBlockchain.url,
        orderId: exchangeInfo.orderId
      })

      if (response.state == "success") {
        setRefundRequestInfo({
          state: "success",
          result: response.data.result
        })
      } else {
        setRefundRequestInfo({
          state: "error",
          error: true
        })
      }
    }
  }

  const getRefundAmounts = async () => {
    if (!currentBlockchain) {
      return null
    }

    const response = await BackendClient.getRefundAmounts({
      apiHost: currentBlockchain.url,
      chainId: currentBlockchain.chain_id
    })

    if (response.state != "success") {
      return null
    }

    return response.data[currentCurrency]
  }

  const handleSetCurrentStep = (step: Step) => {
    if (step != Step.Exchange) {
      dispatch(setSellOrderId(null))
    }

    setCurrentStep(step)
  }

  useEffect(() => {
    return () => {
      dispatch(setSellOrderId(null))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const currentPaymentOption = processedPayments?.find(
      (payment) => payment.value == selectedPayment
    )
    if (
      !!currentRate &&
      !!processedPayments?.length &&
      !!currentPaymentOption?.min
    ) {
      const isMinError =
        Number(giveAmount) < Number(currentPaymentOption!.min) / currentRate
      const isMaxError =
        Number(giveAmount) > Number(currentPaymentOption!.max) / currentRate
      if (isMinError || isMaxError) {
        setGiveAmount(
          parseFloat(
            (Number(currentPaymentOption!.min) / currentRate).toFixed(8)
          ).toString()
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processedPayments, selectedPayment, currentRate])

  useIsomorphicLayoutEffect(() => {
    if (currentBlockchain == null) {
      return
    }

    const sellOrderId = router.query.id

    if (!sellOrderId || Array.isArray(sellOrderId)) {
      return
    }

    const fetchOrder = async (signal: AbortSignal) => {
      setLoadingOrder(true)

      const response = await BackendClient.checkSellOrder({
        apiHost: currentBlockchain.url,
        orderId: sellOrderId,
        signal
      })

      if (
        response.state == "success" &&
        response.data.result.status == "pending"
      ) {
        const { wallet, orderId, timestamp, amountIn } = response.data.result

        const startTimestamp = Number(timestamp)
        const endTimestamp = startTimestamp + 3.6e6

        setExchangeInfo({
          wallet,
          orderId,
          timestamp: endTimestamp.toString(),
          creditedAmount: amountIn
        })

        setCurrentStep(Step.Exchange)
      } else {
        dispatch(setSellOrderId(null))
      }

      setLoadingOrder(false)
    }

    const controller = new AbortController()
    fetchOrder(controller.signal)

    return () => {
      controller.abort()
    }
  }, [currentBlockchain, router.query.id])

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
            max: payment.max,
            icon: `https://${currentBlockchain?.url}${payment.logo}`
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
    if (!selectedPayment && processedPayments && processedPayments.length > 0) {
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
      const controller = new AbortController()

      const interval = setInterval(async () => {
        const response = await BackendClient.checkSellOrder({
          apiHost: currentBlockchain.url,
          orderId: exchangeInfo.orderId,
          signal: controller.signal
        })

        if (response.state == "success") {
          const data = response.data.result

          setExchangeInfo({
            ...exchangeInfo,
            creditedAmount: data.amountIn
          })
        }
      }, 10000)

      return () => {
        clearInterval(interval)
        controller.abort()
      }
    }
  }, [currentStep, exchangeInfo, currentBlockchain])

  return (
    <SelectForm
      loadingOrder={loadingOrder}
      processingRequest={processingRequest}
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
      refundRequestInfo={refundRequestInfo}
      refundInfo={refundInfo}
      depositInfo={depositInfo}
      serviceAvailable={serviceAvailable}
      onBlockchainChange={(blockchain) => {}}
      onCurrencyChange={setSelectedCurrency}
      onTokenChange={onTokenChange}
      onPaymentChange={setSelectedPayment}
      onDetailsChange={setDetails}
      onHolderChange={setHolder}
      onEmailChange={setEmail}
      onGiveAmountChange={setGiveAmount}
      onSubmit={onSubmit}
      setCurrentStep={handleSetCurrentStep}
      onExchange={onExchange}
      onRefund={onRefund}
      onRefundRequest={onRefundRequest}
      getRefundAmounts={getRefundAmounts}
    />
  )
}

export default SellForm
