import { BackendClient } from '@/lib/backend/clients'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useIsomorphicLayoutEffect } from '@/lib/hooks'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { setCurrentRate, setSellOrderId } from '@/lib/redux/crypto'
import { Step } from './select-form/steps'
import type { RequestState } from '@/core/backend/types.core.backend'
import type { ExchangeInfo } from './select-form/types.select-form'
import { PaymentOption } from '../types.form'
import { SellFormProps } from './types.sell-form'

const useSellForm = ({
  currentBlockchain,
  currentToken,
  currentCurrency,
  payments,
  rates,
  blockchains,
  currencies,
  tokens,
  serviceAvailable,
  onTokenChange
}: SellFormProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(Step.Details)
  const [loadingOrder, setLoadingOrder] = useState(false) // used to indicate a loading state if there's an id in query
  const [processingRequest, setProcessingRequest] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [giveAmount, setGiveAmount] = useState('1') // in form it is validated to be a number
  const [email, setEmail] = useState('')
  const [details, setDetails] = useState('')
  const [holder, setHolder] = useState('')
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
  const ref = useAppSelector((state) => state.crypto.ref)

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
        totalAmount: Number(giveAmount),
        ref: ref || undefined
      })

      setProcessingRequest(false)

      const payment = processedPayments?.find(
        (payment) => payment.value == selectedPayment
      )

      if (!payment) {
        return
      }

      if (response.state == 'success') {
        const data = response.data

        setExchangeInfo({
          wallet: data.wallet,
          creditedAmount: 0,
          timestamp: data.end,
          orderId: data.orderId.toString(),
          totalAmount: data.totalAmount,
          curIn: currentCurrency,
          curOut: currentToken.symbol,
          min: payment.min
        })

        setCurrentStep(Step.Exchange)

        dispatch(setSellOrderId(data.orderId.toString()))
      } else {
        setApiError(true)
        return
      }
    }
  }

  const onExchange = async () => {
    if (currentBlockchain && exchangeInfo) {
      setDepositInfo({
        state: 'pending'
      })

      const response = await BackendClient.closeSellOrder({
        apiHost: currentBlockchain.url,
        orderId: exchangeInfo.orderId
      })

      if (response.state == 'success') {
        setDepositInfo({
          state: 'success',
          result: response.data.result
        })
      }
    }
  }

  const onRefund = async (code: string, wallet: string) => {
    if (currentBlockchain && exchangeInfo) {
      setRefundInfo({
        state: 'pending'
      })

      const response = await BackendClient.refund({
        apiHost: currentBlockchain.url,
        orderId: exchangeInfo.orderId,
        code: Number(code),
        wallet
      })

      if (response.state == 'success') {
        setRefundInfo({
          state: 'success',
          result: response.data.result
        })
      } else {
        setRefundInfo({
          state: 'error',
          error: true
        })
      }
    }
  }

  const onRefundRequest = async () => {
    if (currentBlockchain && exchangeInfo) {
      setRefundRequestInfo({
        state: 'pending'
      })

      const response = await BackendClient.refundRequest({
        apiHost: currentBlockchain.url,
        orderId: exchangeInfo.orderId
      })

      if (response.state == 'success') {
        setRefundRequestInfo({
          state: 'success',
          result: response.data.result
        })
      } else {
        setRefundRequestInfo({
          state: 'error',
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

    if (response.state != 'success') {
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

  const handleReview = (review: string) => {
    if (!exchangeInfo?.orderId || !currentBlockchain || review) {
      return
    }

    BackendClient.createFeedback({
      apiHost: currentBlockchain.url,
      content: review,
      orderId: exchangeInfo.orderId
    })
  }

  useEffect(() => {
    return () => {
      dispatch(setSellOrderId(null))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useIsomorphicLayoutEffect(() => {
    const currentPaymentOption = processedPayments?.find(
      (payment) => payment.value == selectedPayment
    )
    if (
      !currentRate ||
      !processedPayments?.length ||
      !currentPaymentOption?.min
    ) {
      return
    }

    const isMinError =
      Number(giveAmount) < currentPaymentOption.min / currentRate
    const isMaxError =
      Number(giveAmount) > currentPaymentOption.max / currentRate
    if (isMinError || isMaxError) {
      setGiveAmount(
        Number((currentPaymentOption.min / currentRate).toFixed(8)).toString()
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processedPayments, selectedPayment, currentRate])

  useIsomorphicLayoutEffect(() => {
    if (currentBlockchain == null || exchangeInfo) {
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

      if (response.state == 'success') {
        const {
          wallet,
          orderId,
          endTimestamp,
          totalAmount,
          amountIn,
          curIn,
          curOut
        } = response.data

        setExchangeInfo({
          wallet,
          orderId,
          timestamp: endTimestamp,
          creditedAmount: amountIn,
          totalAmount,
          curIn: curOut.currency,
          curOut: curIn.symbol,
          min: 5001
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

        if (response.state == 'success') {
          const data = response.data

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

  return {
    loadingOrder: loadingOrder,
    processingRequest,
    currentCurrency: selectedCurrency,
    currentPayment: selectedPayment,
    payments: processedPayments,
    currentDetails: details,
    currentHolder: holder,
    currentEmail: email,
    giveAmount,
    rate: currentRate,
    exchangeInfo: exchangeInfo,
    currentStep,
    refundRequestInfo,
    refundInfo,
    depositInfo,
    onCurrencyChange: setSelectedCurrency,
    onPaymentChange: setSelectedPayment,
    onDetailsChange: setDetails,
    onHolderChange: setHolder,
    onEmailChange: setEmail,
    onGiveAmountChange: setGiveAmount,
    onSubmit,
    setCurrentStep: handleSetCurrentStep,
    onExchange,
    onRefund,
    onRefundRequest,
    getRefundAmounts,
    onReview: handleReview,
    currentBlockchain: currentBlockchain && currentBlockchain.title,
    blockchains: blockchains,
    currencies: currencies,
    currentToken: currentToken && currentToken.symbol,
    tokens: tokens,
    serviceAvailable: serviceAvailable && !apiError,
    onBlockchainChange: (blockchain: any) => {},
    onTokenChange: onTokenChange
  }
}

export default useSellForm
