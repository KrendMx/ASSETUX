import React, { useState, useMemo, useRef } from "react"
import { useTranslation } from "next-i18next"

import { useIsomorphicLayoutEffect } from "@/lib/hooks"

import InputSelect from "@/shared/InputSelect"

import {
  Container,
  FormContainer,
  ExchangeButtonsContainer,
  ExchangeButton,
  ExchangeInfoContainer,
  RefundButton
} from "./styles"

import InputSelectButton from "../../InputSelectButton"
import NextButton from "../../NextButton"
import ExchangeRow from "@/shared/ExchangeInfo"
import HideableWithMargin from "../../HideableWithMargin"
import ExchangeInfoRow from "./ExchangeInfoRow"
import QRcode from "./QRcode"

import RefundModal from "./Modals/Refund/Modal"
import RefundWalletModal from "./Modals/Refund/Wallet"
import RefundCodeModal from "./Modals/Refund/Code"
import RefundInsufficient from "./Modals/Refund/Insufficient"
import RefundResultModal from "./Modals/Refund/Result"
import RefundCodeInvalid from "./Modals/Refund/CodeInvalid"
import ExchangeModal from "./Modals/Exchange/Modal"
import ExchangeResultModal from "./Modals/Exchange/Result"
import ExchangeUnknownModal from "./Modals/Exchange/UnknownError"
import ExchangeExpired from "./Modals/ExchangeExpired"
import Background from "@/shared/Background"
import Maintenance from "../../Maintenance"

import { holderRegexp, emailRegexp, allowSkeletons } from "@/lib/data/constants"

import Skeleton from "react-loading-skeleton"
import { useAppSelector } from "@/lib/redux/hooks"
import { stringToPieces, validateDecimal } from "@/lib/utils/helpers"
import { Step } from "./Steps"
import { mapCurrencyName, isCurrencyDeclared } from "@/lib/data/currencies"

import type { Error, SelectFormProps } from "./types"
import type { Option } from "@/shared/InputSelect/types"

const inputIds = {
  get: "get",
  give: "give",
  details: "cardnumber",
  holder: "ccname",
  blockchains: "blockchains",
  payments: "payments",
  email: "email"
}

function SelectForm({
  loadingOrder,
  processingRequest,
  currentBlockchain,
  blockchains,
  currentCurrency,
  currencies,
  currentToken,
  tokens,
  currentPayment,
  payments,
  currentDetails,
  currentHolder,
  currentEmail,
  giveAmount,
  rate,
  exchangeInfo,
  currentStep,
  depositInfo,
  serviceAvailable,
  refundRequestInfo,
  refundInfo,
  onBlockchainChange,
  onCurrencyChange,
  onTokenChange,
  onPaymentChange,
  onDetailsChange,
  onHolderChange,
  onEmailChange,
  onGiveAmountChange,
  onSubmit,
  setCurrentStep,
  onExchange,
  onRefund,
  onRefundRequest,
  getRefundAmounts
}: SelectFormProps) {
  const { t } = useTranslation("home")

  const [inputError, setInputError] = useState<Error>({})
  const [chainActive, setChainActive] = useState(false)
  const [giveActive, setGiveActive] = useState(false)
  const [getActive, setGetActive] = useState(false)
  const [paymentActive, setPaymentActive] = useState(false)
  const [minimalRefundAmount, setMinimalRefundAmount] = useState<number | null>(
    null
  )

  const [showRefundModal, setShowRefundModal] = useState(false)
  const [showRefundWalletModal, setShowRefundWalletModal] = useState(false)
  const [showRefundCodeModal, setShowRefundCodeModal] = useState(false)
  const [showRefundInsufficient, setShowRefundInsufficient] = useState(false)
  const [showRefundModalResult, setShowRefundModalResult] = useState(false)
  const [showRefundCodeInvalid, setShowRefundCodeInvalid] = useState(false)

  const [showExpiredModal, setShowExpiredModal] = useState(false)

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
    () => stringToPieces(currentDetails, 4, " "),
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
        return t("home:sell_maximumIs") + " " + currentPaymentOption.max
      } else {
        return t("home:sell_minimumIs") + " " + currentPaymentOption.min
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
      case "success":
        setShowRefundModal(false)
        setShowRefundWalletModal(true)
        break
      case "error":
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
      case "success":
        setShowRefundModalResult(true)
        setShowRefundCodeModal(false)
        break
      case "error":
        setShowRefundCodeModal(false)
        setShowRefundCodeInvalid(true)
        break
    }
  }, [refundInfo])

  useIsomorphicLayoutEffect(() => {
    if (depositInfo == null) {
      return
    }

    if ("error" in depositInfo) {
      setShowExchangeUnknownModal(true)
      setShowExchangeModal(false)
    } else {
      setShowExchangeResultModal(true)
      setShowExchangeModal(false)
    }
  }, [depositInfo])

  let checkedBlockchains: Option[] | undefined
  if (blockchains) checkedBlockchains = blockchains
  let checkedCurrencies: Option[] | undefined
  if (currencies) checkedCurrencies = currencies
  let checkedTokens: Option[] | undefined
  if (tokens) checkedTokens = tokens
  let checkedPayments: Option[] | undefined
  if (payments) checkedPayments = payments

  const serviceUnavailable = serviceAvailable == null || !serviceAvailable

  let getAmount = ""
  if (rate && giveAmount != "") {
    getAmount = (Number(giveAmount) * rate).toFixed(2)
  }

  let creditedGetAmount = ""
  if (rate && giveAmount != "" && exchangeInfo) {
    creditedGetAmount = (exchangeInfo.creditedAmount * rate).toFixed(2)
  }

  const isLoading =
    allowSkeletons &&
    (!appLoaded ||
      !checkedBlockchains ||
      !checkedTokens ||
      !checkedCurrencies ||
      !rate ||
      serviceAvailable == null ||
      loadingOrder)

  const handleGiveInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    const [validated, result] = validateDecimal(value)

    if (!validated) {
      return
    }

    onGiveAmountChange(result)
  }

  const handleDetailsInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value.replaceAll(" ", "")
    const validated = /^[0-9]*$/.test(value)
    validated && onDetailsChange(value)
  }

  const handleHolderInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    onHolderChange(value.toUpperCase())
  }

  const handleEmailInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value
    onEmailChange(value)
  }

  const handleNextStep = () => {
    if (serviceUnavailable) {
      return
    }

    let errorObject: Error = {}

    const errorRanges = checkRanges(Number(getAmount))

    if (errorRanges) {
      errorObject[inputIds.get] = errorRanges
    }

    if (giveAmount == "") {
      errorObject[inputIds.give] = t("home:sell_invalidGive")
    }

    if (currentStep == Step.Payment) {
      if (currentDetails == "") {
        errorObject[inputIds.details] = t("home:sell_invalidCard")
      }

      if (currentHolder == "" || !holderRegexp.test(currentHolder)) {
        errorObject[inputIds.holder] = t("home:sell_invalidHolder")
      }

      if (currentEmail == "" || !emailRegexp.test(currentEmail)) {
        errorObject[inputIds.email] = t("home:sell_invalidEmail")
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

  const renderFields = () => {
    if (currentStep == Step.Details) {
      return (
        <FormContainer>
          {!isLoading ? (
            <InputSelect
              label={t("home:sell_blockchain")}
              id={inputIds.blockchains}
              selectLabel={t("home:sell_blockchainLabel")}
              options={checkedBlockchains}
              displayInSelect={3}
              onActiveChange={(active) => setChainActive(active)}
              onSelect={onBlockchainChange}
              selectedValue={currentBlockchain}
              selectable={false}
              displayIcon
            />
          ) : (
            <Skeleton containerClassName="input-skeleton" />
          )}
          <HideableWithMargin hide={chainActive} margins>
            {!isLoading ? (
              <InputSelect
                label={t("home:sell_give")}
                id={inputIds.give}
                value={giveAmount}
                options={checkedTokens}
                onChange={handleGiveInput}
                onActiveChange={(active) => setGiveActive(active)}
                onSelect={onTokenChange}
                error={inputError[inputIds.give]}
                selectedValue={currentToken}
                displayInSelect={2}
                onlyNumbers
                changeable
              />
            ) : (
              <Skeleton containerClassName="input-skeleton" />
            )}
            <HideableWithMargin hide={giveActive} margins>
              <ExchangeRow
                token={currentToken}
                currency={currentCurrency}
                rate={rate}
                isLoading={isLoading}
                placeholder={t("home:exchange_fees")}
                text="asdads"
                margins
              />
              {!isLoading ? (
                <InputSelect
                  label={`${t("home:sell_get")}: ${
                    currentPaymentOption?.min
                  } - ${currentPaymentOption?.max}`}
                  id={inputIds.get}
                  options={checkedCurrencies}
                  displayInSelect={1}
                  onActiveChange={(active) => setGetActive(active)}
                  selectedValue={currentCurrency}
                  error={inputError[inputIds.get]}
                  onSelect={onCurrencyChange}
                  selectable={false}
                  onlyNumbers
                  value={getAmount}
                />
              ) : (
                <Skeleton containerClassName="input-skeleton" />
              )}
              <HideableWithMargin hide={getActive} margins>
                {!isLoading ? (
                  <InputSelect
                    label={t("home:sell_payment")}
                    id={inputIds.payments}
                    options={checkedPayments}
                    onSelect={onPaymentChange}
                    onActiveChange={(active) => setPaymentActive(active)}
                    selectedValue={currentPayment}
                    displayIcon
                  />
                ) : (
                  <Skeleton containerClassName="input-skeleton" />
                )}
              </HideableWithMargin>
            </HideableWithMargin>
          </HideableWithMargin>
        </FormContainer>
      )
    } else if (currentStep == Step.Payment) {
      return (
        <FormContainer>
          <InputSelectButton
            label={t("home:sell_backTo")}
            value={t("home:sell_orderDetails")}
            onClick={() => setCurrentStep(Step.Details)}
          />
          <HideableWithMargin hide={false} margins>
            <InputSelect
              label={t("home:sell_cardNumber")}
              id={inputIds.details}
              onChange={handleDetailsInput}
              value={piecedDetails}
              error={inputError[inputIds.details]}
              autocomplete="cc-number"
              changeable
            />
          </HideableWithMargin>
          <HideableWithMargin hide={false} margins>
            <InputSelect
              label={t("home:sell_cardHolder")}
              id={inputIds.holder}
              onChange={handleHolderInput}
              value={currentHolder}
              error={inputError[inputIds.holder]}
              autocomplete="cc-name"
              changeable
            />
          </HideableWithMargin>
          <HideableWithMargin hide={false} margins>
            <InputSelect
              label={t("home:sell_email")}
              id={inputIds.email}
              onChange={handleEmailInput}
              value={currentEmail}
              error={inputError[inputIds.email]}
              autocomplete="email"
              type="email"
              changeable
            />
          </HideableWithMargin>
        </FormContainer>
      )
    } else if (currentStep == Step.Exchange && exchangeInfo) {
      return (
        <>
          <FormContainer>
            <InputSelectButton
              label={t("home:sell_backTo")}
              value={t("home:sell_orderDetails")}
              onClick={() => setCurrentStep(Step.Details)}
            />
            <ExchangeInfoContainer>
              <QRcode valueToCopy={exchangeInfo.wallet} />
              <ExchangeInfoRow
                label={t("home:sell_wallet")}
                value={exchangeInfo.wallet}
                copyLabel={t("home:sell_copyAddress")}
                valueToCopy={exchangeInfo.wallet}
              />
              <ExchangeInfoRow
                label={t("home:sell_totalAmount")}
                value={`${giveAmount} ${currentToken}`}
                copyLabel={t("home:sell_copyAmount")}
                valueToCopy={giveAmount}
              />
              <ExchangeInfoRow
                label={t("home:sell_creditedAmount")}
                value={`${exchangeInfo.creditedAmount} ${currentToken}`}
                timestamp={Number(exchangeInfo.timestamp)}
                onExpired={async () => {
                  const response = await getRefundAmounts()

                  if (response) {
                    setShowExpiredModal(true)
                  } else {
                    setShowExchangeUnknownModal(true)
                  }

                  setMinimalRefundAmount(response)
                }}
              />
              <ExchangeRow
                token={currentToken}
                currency={currentCurrency}
                rate={rate}
                isLoading={false}
                placeholder={t("home:exchange_fees")}
                text="asdads"
              />
              <ExchangeInfoRow
                label={t("home:sell_amountToGet")}
                value={`${creditedGetAmount} ${
                  currentCurrency &&
                  isCurrencyDeclared(currentCurrency) &&
                  mapCurrencyName(currentCurrency)
                } (${currentCurrency})`}
              />
            </ExchangeInfoContainer>
          </FormContainer>
          <ExchangeButtonsContainer>
            <ExchangeButton onClick={() => setShowExchangeModal(true)}>
              {t("home:sell_exchange")}
            </ExchangeButton>
            <RefundButton onClick={() => setShowRefundModal(true)}>
              {t("home:sell_refund")}
            </RefundButton>
          </ExchangeButtonsContainer>
        </>
      )
    }
  }

  return (
    <Container formStep={currentStep} lastSelectorActive={paymentActive}>
      {renderFields()}
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
              t("home:sell_wait")
            ) : (
              t("home:sell_next")
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
          isLoading={refundRequestInfo?.state == "pending"}
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
          isLoading={refundInfo?.state == "pending"}
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
          onAccept={() => {
            setShowRefundModalResult(false)
            setCurrentStep(Step.Details)
          }}
          getToken={currencies?.find(
            (currency) => currency.value == currentCurrency
          )}
          getValue={creditedGetAmount}
        />
      )}

      {showRefundInsufficient && (
        <RefundInsufficient
          onAccept={() => setShowRefundInsufficient(false)}
          sentValue={exchangeInfo?.creditedAmount.toString()}
          sentToken={tokens?.find((token) => token.value == currentToken)}
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
          isLoading={depositInfo?.state == "pending"}
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
          onAccept={() => {
            setShowExpiredModal(false)
            setCurrentStep(Step.Details)
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
        showExchangeUnknownModal) && <Background scrollToTop />}
    </Container>
  )
}

export default SelectForm
