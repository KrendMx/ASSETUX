import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import NextButton from '../../common/next-button'
import Maintenance from '../../common/maintenance'
import RefundModal from './modals/refund/modal'
import RefundWalletModal from './modals/refund/wallet'
import RefundCodeModal from './modals/refund/code'
import RefundInsufficient from './modals/refund/insufficient'
import RefundResultModal from './modals/refund/result'
import RefundCodeInvalid from './modals/refund/code-invalid'
import ExchangeModal from './modals/exchange/modal'
import ExchangeResultModal from './modals/exchange/result'
import ExchangeUnknownModal from './modals/exchange/unknown-error'
import ExchangeExpired from './modals/exchange-expired'
import NotEnough from './modals/exchange/not-enough'
import Background from '@/components/common/background'
import Skeleton from 'react-loading-skeleton'
import { Step } from './steps'
import type { SelectFormProps } from './types.select-form'
import { Container } from './styles'
import RenderFields from './renderFields'
import useSelectSellForm from './useSelectSellForm'

export const inputIds = {
  get: 'get',
  give: 'give',
  details: 'cardnumber',
  holder: 'ccname',
  blockchains: 'blockchains',
  payments: 'payments',
  email: 'email'
}

const SelectForm = (props: SelectFormProps) => {
  const {
    processingRequest,
    currentCurrency,
    currencies,
    currentToken,
    tokens,
    currentPayment,
    currentHolder,
    currentEmail,
    giveAmount,
    rate,
    exchangeInfo,
    currentStep,
    depositInfo,
    refundRequestInfo,
    refundInfo,
    setCurrentStep,
    onExchange,
    onRefundRequest,
    onReview
  } = props
  const { t } = useTranslation('home')

  const [chainActive, setChainActive] = useState(false)
  const [giveActive, setGiveActive] = useState(false)
  const [getActive, setGetActive] = useState(false)
  const [paymentActive, setPaymentActive] = useState(false)
  const [minimalRefundAmount, setMinimalRefundAmount] = useState<number | null>(
    null
  )
  const [showExpiredModal, setShowExpiredModal] = useState(false)
  const [showNotEnoughModal, setShowNotEnoughModal] = useState(false)

  const {
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
  } = useSelectSellForm(props)

  return (
    <Container formStep={currentStep} lastSelectorActive={paymentActive}>
      <RenderFields
        {...props}
        {...{
          currentStep,
          isLoading,
          checkedBlockchains,
          chainActive,
          giveAmount,
          checkedTokens,
          inputError,
          currentToken,
          rate,
          currentPayment,
          currentHolder,
          currentEmail,
          giveActive,
          currentCurrency,
          currentPaymentOption,
          checkedCurrencies,
          getAmount,
          getActive,
          piecedDetails,
          exchangeInfo,
          creditedGetAmount,
          setShowNotEnoughModal,
          setChainActive,
          setGiveActive,
          setGetActive,
          setPaymentActive,
          setMinimalRefundAmount,
          setShowExpiredModal,
          setShowExchangeUnknownModal,
          setCurrentStep,
          setShowRefundModal
        }}
      />
      {!chainActive &&
        !giveActive &&
        !getActive &&
        !paymentActive &&
        currentStep != Step.Exchange && (
          <NextButton
            onClick={handleNextStep}
            disabled={processingRequest || isLoading || serviceUnavailable}
            isLoading={isLoading}
          >
            {isLoading ? (
              <Skeleton
                height="3.035em"
                containerClassName="skeletonFlexContainer skeletonZeroLineHeight"
              />
            ) : processingRequest ? (
              t('home:sell_wait')
            ) : (
              t('home:sell_next')
            )}
          </NextButton>
        )}
      {exchangeInfo != null && showRefundModal && (
        <RefundModal
          getValue={creditedGetAmount}
          sentValue={exchangeInfo.creditedAmount.toString()}
          sentToken={tokens?.find((token) => token.value == currentToken)}
          getToken={currencies?.find(
            (currency) => currency.value == currentCurrency
          )}
          isLoading={refundRequestInfo?.state == 'pending'}
          onCancel={() => setShowRefundModal(false)}
          onAccept={() => {
            onRefundRequest()
          }}
        />
      )}
      {showRefundWalletModal && (
        <RefundWalletModal
          onAccept={(wallet) => {
            refundData.current.wallet = wallet

            setShowRefundWalletModal(false)
            setShowRefundCodeModal(true)
          }}
          onCancel={() => setShowRefundWalletModal(false)}
        />
      )}
      {showRefundCodeModal && (
        <RefundCodeModal
          isLoading={refundInfo?.state == 'pending'}
          onAccept={(code) => {
            refundData.current.code = code

            handleRefund()
          }}
          onCancel={() => {
            setShowRefundCodeModal(false)
          }}
        />
      )}
      {showRefundCodeInvalid && (
        <RefundCodeInvalid
          onAccept={() => {
            setShowRefundCodeInvalid(false)
            setShowRefundCodeModal(true)
          }}
        />
      )}

      {showRefundModalResult && (
        <RefundResultModal
          onAccept={(review) => {
            setShowRefundModalResult(false)
            setCurrentStep(Step.Details)

            onReview(review)
          }}
          getToken={currencies?.find(
            (currency) => currency.value == currentCurrency
          )}
          getValue={creditedGetAmount}
        />
      )}

      {showRefundInsufficient && (
        <RefundInsufficient
          onAccept={(review) => {
            setShowRefundInsufficient(false)
            onReview(review)
          }}
          sentValue={exchangeInfo?.creditedAmount.toString()}
          sentToken={tokens?.find((token) => token.value == currentToken)}
        />
      )}

      {showNotEnoughModal &&
        currentPaymentOption &&
        currentCurrency &&
        exchangeInfo && (
          <NotEnough
            min={exchangeInfo.min}
            fiat={exchangeInfo.curIn}
            onAccept={() => setShowNotEnoughModal(false)}
          />
        )}

      {exchangeInfo && showExchangeModal && (
        <ExchangeModal
          getValue={creditedGetAmount}
          sentValue={exchangeInfo.creditedAmount.toString()}
          sentToken={tokens?.find((token) => token.value == currentToken)}
          getToken={currencies?.find(
            (currency) => currency.value == currentCurrency
          )}
          isLoading={depositInfo?.state == 'pending'}
          onCancel={() => setShowExchangeModal(false)}
          onAccept={() => {
            onExchange()
          }}
        />
      )}

      {exchangeInfo && showExchangeResultModal && (
        <ExchangeResultModal
          getValue={creditedGetAmount}
          getToken={currencies?.find(
            (currency) => currency.value == currentCurrency
          )}
          onAccept={() => {
            setShowExchangeResultModal(false)
            setCurrentStep(Step.Details)
          }}
        />
      )}

      {showExchangeUnknownModal && (
        <ExchangeUnknownModal
          onAccept={() => setShowExchangeUnknownModal(false)}
        />
      )}

      {exchangeInfo && rate && minimalRefundAmount && showExpiredModal && (
        <ExchangeExpired
          onAccept={(review) => {
            setShowExpiredModal(false)
            setCurrentStep(Step.Details)

            onReview(review)
          }}
          getValue={creditedGetAmount}
          sentValue={exchangeInfo.creditedAmount.toString()}
          sentToken={tokens?.find((token) => token.value == currentToken)}
          getToken={currencies?.find(
            (currency) => currency.value == currentCurrency
          )}
          rate={rate}
          minimalAmount={minimalRefundAmount}
          orderId={exchangeInfo.orderId}
        />
      )}

      {!isLoading && serviceUnavailable && <Maintenance />}

      {(showRefundModal ||
        showRefundWalletModal ||
        showRefundCodeModal ||
        showRefundInsufficient ||
        showRefundModalResult ||
        showRefundCodeInvalid ||
        showExpiredModal ||
        showExchangeModal ||
        showExchangeResultModal ||
        showExchangeUnknownModal ||
        showNotEnoughModal) && (
        <Background scrollToTop absolute allowScrolling />
      )}
    </Container>
  )
}

export default SelectForm
