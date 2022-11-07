import { useAppSelector } from '@/lib/redux/hooks'
import { stringToPieces, validateDecimal } from '@/lib/utils/helpers.utils'
import { useMemo, useRef, useState } from 'react'
import { Error, SelectFormProps } from './types.select-form'
import { holderRegexp, emailRegexp, allowSkeletons } from '@/lib/data/constants'
import type { Option } from '@/components/common/input-select/types.input-select'
import { Step } from './steps'
import { inputIds } from './select-form'
import { useIsomorphicLayoutEffect } from '@/lib/hooks'
import { useTranslation } from 'next-i18next'

const useSelectSellForm = ({
  refundRequestInfo,
  currentPayment,
  refundInfo,
  depositInfo,
  blockchains,
  currencies,
  tokens,
  exchangeInfo,
  rate,
  serviceAvailable,
  loadingOrder,
  giveAmount,
  currentDetails,
  currentHolder,
  currentEmail,
  setCurrentStep,
  currentStep,
  onSubmit,
  onRefund,
  payments
}: SelectFormProps) => {
  const { t } = useTranslation('home')
  const [inputError, setInputError] = useState<Error>({})
  const [showRefundModal, setShowRefundModal] = useState(false)
  const [showRefundWalletModal, setShowRefundWalletModal] = useState(false)
  const [showRefundCodeModal, setShowRefundCodeModal] = useState(false)
  const [showRefundInsufficient, setShowRefundInsufficient] = useState(false)
  const [showRefundModalResult, setShowRefundModalResult] = useState(false)
  const [showRefundCodeInvalid, setShowRefundCodeInvalid] = useState(false)
  const [showExchangeModal, setShowExchangeModal] = useState(false)
  const [showExchangeResultModal, setShowExchangeResultModal] = useState(false)
  const [showExchangeUnknownModal, setShowExchangeUnknownModal] =
    useState(false)

  const appLoaded = useAppSelector((state) => state.ui.appLoaded)

  const refundData = useRef<{
    wallet: string | null
    code: string | null
  }>({
    wallet: null,
    code: null
  })

  const piecedDetails = useMemo(
    () => stringToPieces(currentDetails, 4, ' '),
    [currentDetails]
  )

  const currentPaymentOption = useMemo(
    () => payments?.find((payment) => payment.value == currentPayment),
    [payments, currentPayment]
  )

  const checkRanges = (value: number): string | null => {
    if (!currentPaymentOption) {
      return null
    }

    if (value < currentPaymentOption.min || value > currentPaymentOption.max) {
      if (value > currentPaymentOption.max) {
        return t('home:sell_maximumIs') + ' ' + currentPaymentOption.max
      } else {
        return t('home:sell_minimumIs') + ' ' + currentPaymentOption.min
      }
    } else {
      return null
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (!refundRequestInfo) {
      return
    }

    switch (refundRequestInfo.state) {
      case 'success':
        setShowRefundModal(false)
        setShowRefundWalletModal(true)
        break
      case 'error':
        setShowRefundModal(false)
        setShowRefundInsufficient(true)
        break
    }
  }, [refundRequestInfo])

  useIsomorphicLayoutEffect(() => {
    const errorRanges = checkRanges(Number(getAmount))

    setInputError({
      ...inputError,
      [inputIds.get]: errorRanges ?? undefined
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPayment, giveAmount])

  useIsomorphicLayoutEffect(() => {
    if (!refundInfo) {
      return
    }

    switch (refundInfo.state) {
      case 'success':
        setShowRefundModalResult(true)
        setShowRefundCodeModal(false)
        break
      case 'error':
        setShowRefundCodeModal(false)
        setShowRefundCodeInvalid(true)
        break
    }
  }, [refundInfo])

  useIsomorphicLayoutEffect(() => {
    if (depositInfo == null) {
      return
    }

    if ('error' in depositInfo) {
      setShowExchangeUnknownModal(true)
      setShowExchangeModal(false)
    } else {
      setShowExchangeResultModal(true)
      setShowExchangeModal(false)
    }
  }, [depositInfo])

  const checkedBlockchains: Option[] | undefined = useMemo(() => {
    return !!blockchains ? blockchains : undefined
  }, [blockchains])

  const checkedCurrencies: Option[] | undefined = useMemo(() => {
    return !!currencies ? currencies : undefined
  }, [currencies])

  const checkedTokens: Option[] | undefined = useMemo(() => {
    return !!tokens ? tokens : undefined
  }, [tokens])

  const serviceUnavailable = useMemo(() => {
    return serviceAvailable == null || !serviceAvailable
  }, [serviceAvailable])

  const getAmount = useMemo(() => {
    if (rate && giveAmount != '') {
      return (Number(giveAmount) * rate).toFixed(2)
    } else return ''
  }, [giveAmount, rate])

  const creditedGetAmount = useMemo(() => {
    if (rate && giveAmount != '' && exchangeInfo) {
      return (exchangeInfo.creditedAmount * rate).toFixed(2)
    } else return ''
  }, [exchangeInfo, giveAmount, rate])

  const isLoading = useMemo(() => {
    return (
      allowSkeletons &&
      (!appLoaded ||
        !checkedBlockchains ||
        !checkedTokens ||
        !checkedCurrencies ||
        !rate ||
        serviceAvailable == null ||
        loadingOrder)
    )
  }, [
    appLoaded,
    checkedBlockchains,
    checkedCurrencies,
    checkedTokens,
    loadingOrder,
    rate,
    serviceAvailable
  ])

  const handleNextStep = () => {
    // console.log(serviceUnavailable)
    if (serviceUnavailable) {
      return
    }

    let errorObject: Error = {}

    const errorRanges = checkRanges(Number(getAmount))

    if (errorRanges) {
      errorObject[inputIds.get] = errorRanges
    }

    if (giveAmount == '') {
      errorObject[inputIds.give] = t('home:sell_invalidGive')
    }

    if (currentStep == Step.Payment) {
      if (currentDetails == '') {
        errorObject[inputIds.details] = t('home:sell_invalidCard')
      }

      if (currentHolder == '' || !holderRegexp.test(currentHolder)) {
        errorObject[inputIds.holder] = t('home:sell_invalidHolder')
      }

      if (currentEmail == '' || !emailRegexp.test(currentEmail)) {
        errorObject[inputIds.email] = t('home:sell_invalidEmail')
      }
    }

    setInputError(errorObject)

    if (Object.keys(errorObject).length == 0) {
      if (currentStep == Step.Details) {
        setCurrentStep(Step.Payment)
      } else if (currentStep == Step.Payment) {
        onSubmit()
      }
    }
  }

  const handleRefund = () => {
    if (refundData.current.wallet != null && refundData.current.code != null) {
      onRefund(refundData.current.code, refundData.current.wallet)
    }
  }
  return {
    showRefundModal,
    showRefundWalletModal,
    showRefundCodeModal,
    showRefundInsufficient,
    showRefundModalResult,
    showRefundCodeInvalid,
    showExchangeModal,
    showExchangeResultModal,
    showExchangeUnknownModal,
    handleRefund,
    isLoading,
    checkedBlockchains,
    checkedTokens,
    inputError,
    currentPaymentOption,
    checkedCurrencies,
    getAmount,
    piecedDetails,
    creditedGetAmount,
    setShowExchangeUnknownModal,
    setShowRefundModal,
    handleNextStep,
    serviceUnavailable,
    setShowRefundWalletModal,
    setShowRefundCodeModal,
    refundData,
    setShowRefundCodeInvalid,
    setShowRefundInsufficient,
    setShowExchangeModal,
    setShowExchangeResultModal,
    setShowRefundModalResult
  }
}

export default useSelectSellForm
