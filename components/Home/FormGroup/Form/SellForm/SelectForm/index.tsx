import React, { useState, useMemo, useRef, useEffect } from "react"

import Container from "./Container"
import InputSelect from "../../InputSelect"
import InputSelectButton from "../../InputSelectButton"
import NextButton from "../../NextButton"
import FormContainer from "./FormContainer"
import ExchangeRow from "../../Exchange"
import HideableWithMargin from "../../HideableWithMargin"
import ExchangeInfoContainer from "./ExchangeInfoContainer"
import ExchangeInfoRow from "./ExchangeInfoRow"
import {
  ExchangeButtonsContainer,
  RefundButton,
  ExchangeButton
} from "./ExchangeButtons"
import RefundModal from "./Modals/RefundModal"
import RefundWalletModal from "./Modals/RefundWalletModal"
import RefundCodeModal from "./Modals/RefundCodeModal"
import RefundInsufficient from "./Modals/RefundInsufficient"
import RefundResultModal from "./Modals/RefundResultModal"
import RefundCodeInvalid from "./Modals/RefundCodeInvalid"
import Background from "@/shared/Background"

import {
  holderRegexp,
  emailRegexp,
  floatRegexp,
  allowSkeletons
} from "@/src/constants"

import Skeleton from "react-loading-skeleton"
import { useAppSelector } from "@/src/redux/hooks"
import { stringToPieces } from "@/src/helpers"
import { Step } from "./Steps"
import { mapCurrencyName, isCurrencyDeclared } from "@/src/currencies"
import QRcode from "./QRcode"

import type { Error, ExchangeInfo, DepositInfo } from "./types"
import type { PaymentOption } from "../../types"
import type { Option } from "../../InputSelect/types"

let alreadyLoaded = false

const inputIds = {
  get: "get",
  give: "give",
  details: "details",
  holder: "holder",
  blockchains: "blockchains",
  payments: "payments",
  email: "email"
}

type CurrencyFormProps = {
  currentBlockchain: string | null
  blockchains: Option[] | null
  currentCurrency: string | null
  currencies: Option[] | null
  currentToken: string | null
  tokens: Option[] | null
  currentPayment: string | null
  payments: PaymentOption[] | null
  currentDetails: string
  currentHolder: string
  currentEmail: string
  giveAmount: string
  rate: number | null
  exchangeInfo: ExchangeInfo | null
  processingRequest: boolean
  currentStep: Step
  depositInfo?: DepositInfo
  refundRequestError: { result: string | null; isLoading: boolean } | null
  refundError: { result: string | null; isLoading: boolean } | null
  onBlockchainChange: (blockchain: string) => void
  onCurrencyChange: (currency: string) => void
  onTokenChange: (token: string) => void
  onPaymentChange: (payment: string) => void
  onDetailsChange: (details: string) => void
  onHolderChange: (holder: string) => void
  onEmailChange: (email: string) => void
  onGiveAmountChange: (amount: string) => void
  onSubmit: () => void
  setCurrentStep: (step: Step) => void
  onExchange: () => void
  onRefund: (code: string, wallet: string) => void
  onRefundRequest: () => void
}

function CurrencyForm({
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
  processingRequest,
  exchangeInfo,
  currentStep,
  depositInfo,
  refundRequestError,
  refundError,
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
  onRefundRequest
}: CurrencyFormProps) {
  const [inputError, setInputError] = useState<Error>({})
  const [chainActive, setChainActive] = useState(false)
  const [giveActive, setGiveActive] = useState(false)
  const [getActive, setGetActive] = useState(false)
  const [paymentActive, setPaymentActive] = useState(false)
  const [showRefundModal, setShowRefundModal] = useState(false)
  const [showRefundWalletModal, setShowRefundWalletModal] = useState(false)
  const [showRefundCodeModal, setShowRefundCodeModal] = useState(false)
  const [showRefundInsufficient, setShowRefundInsufficient] = useState(false)
  const [showRefundModalResult, setShowRefundModalResult] = useState(false)
  const [showRefundCodeInvalid, setShowRefundCodeInvalid] = useState(false)
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

  useEffect(() => {
    if (!refundRequestError) {
      return
    }

    if (!refundRequestError.isLoading && refundRequestError.result == null) {
      setShowRefundModal(false)
      setShowRefundWalletModal(true)
    } else {
      setShowRefundModal(false)

      setShowRefundInsufficient(true)
    }
  }, [refundRequestError])

  useEffect(() => {
    if (!refundError) {
      return
    }

    if (!refundError.isLoading && refundError.result == null) {
      setShowRefundModalResult(true)
      setShowRefundCodeModal(false)
    } else {
      setShowRefundCodeModal(false)
      setShowRefundCodeInvalid(true)
    }
  }, [refundError])

  let checkedBlockchains: Option[] | undefined
  if (blockchains) checkedBlockchains = blockchains
  let checkedCurrencies: Option[] | undefined
  if (currencies) checkedCurrencies = currencies
  let checkedTokens: Option[] | undefined
  if (tokens) checkedTokens = tokens
  let checkedPayments: Option[] | undefined
  if (payments) checkedPayments = payments

  let getAmount = ""
  if (rate && giveAmount != "") {
    getAmount = (Number(giveAmount) * rate).toFixed(2)
  }

  let creditedGetAmount = ""
  if (rate && giveAmount != "" && exchangeInfo) {
    creditedGetAmount = (exchangeInfo.creditedAmount * rate).toFixed(2)
  }

  const isLoading =
    !alreadyLoaded &&
    allowSkeletons &&
    (!appLoaded ||
      !checkedBlockchains ||
      !checkedTokens ||
      !checkedCurrencies ||
      !rate)

  if (!isLoading) {
    alreadyLoaded = true
  }

  const handleGiveInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value
    if (value == "" || floatRegexp.test(value)) {
      onGiveAmountChange(value)
    }
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
    let errorObject: Error = {}

    if (giveAmount == "") {
      errorObject[inputIds.give] = "Invalid give amount"
    }

    if (currentStep == Step.Payment) {
      if (currentDetails == "") {
        errorObject[inputIds.details] = "Invalid card number"
      }

      if (currentHolder == "" || !holderRegexp.test(currentHolder)) {
        errorObject[inputIds.holder] = "Invalid holder information"
      }

      if (currentEmail == "" || !emailRegexp.test(currentEmail)) {
        errorObject[inputIds.email] = "Invalid email"
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
              label="Blockchain"
              id={inputIds.blockchains}
              selectLabel="You are currently using Assetux on"
              options={checkedBlockchains}
              displayInSelect={3}
              onActiveChange={(active) => setChainActive(active)}
              onSelect={onBlockchainChange}
              selectedValue={currentBlockchain}
              displayIcon
            />
          ) : (
            <Skeleton height={65} />
          )}
          <HideableWithMargin hide={chainActive} margins>
            {!isLoading ? (
              <InputSelect
                label="You give"
                id={inputIds.give}
                value={giveAmount}
                options={checkedTokens}
                onChange={handleGiveInput}
                onActiveChange={(active) => setGiveActive(active)}
                onSelect={onTokenChange}
                error={inputError[inputIds.give]}
                selectedValue={currentToken}
                displayInSelect={2}
                changeable
              />
            ) : (
              <Skeleton height={65} />
            )}
            <HideableWithMargin hide={giveActive} margins>
              <ExchangeRow
                token={currentToken}
                currency={currentCurrency}
                rate={rate}
                isLoading={isLoading}
                margins
              />
              {!isLoading ? (
                <InputSelect
                  label="You get"
                  id={inputIds.get}
                  options={checkedCurrencies}
                  displayInSelect={1}
                  onActiveChange={(active) => setGetActive(active)}
                  selectedValue={currentCurrency}
                  onSelect={onCurrencyChange}
                  value={getAmount}
                />
              ) : (
                <Skeleton height={65} />
              )}
              <HideableWithMargin hide={getActive} margins>
                {!isLoading ? (
                  <InputSelect
                    label="Payment Method"
                    id={inputIds.payments}
                    options={checkedPayments}
                    onSelect={onPaymentChange}
                    onActiveChange={(active) => setPaymentActive(active)}
                    selectedValue={currentPayment}
                    displayIcon
                  />
                ) : (
                  <Skeleton height={65} />
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
            label="Back to"
            value="Order details"
            onClick={() => setCurrentStep(Step.Details)}
          />
          <HideableWithMargin hide={false} margins>
            <InputSelect
              label="Card Number"
              id={inputIds.details}
              onChange={handleDetailsInput}
              value={piecedDetails}
              error={inputError[inputIds.details]}
              changeable
            />
          </HideableWithMargin>
          <HideableWithMargin hide={false} margins>
            <InputSelect
              label="Card Holder"
              id={inputIds.holder}
              onChange={handleHolderInput}
              value={currentHolder}
              error={inputError[inputIds.holder]}
              changeable
            />
          </HideableWithMargin>
          <HideableWithMargin hide={false} margins>
            <InputSelect
              label="Email"
              id={inputIds.email}
              onChange={handleEmailInput}
              value={currentEmail}
              error={inputError[inputIds.email]}
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
              label="Back to"
              value="Payment details"
              onClick={() => setCurrentStep(Step.Payment)}
            />
            <ExchangeInfoContainer>
              <QRcode valueToCopy={exchangeInfo.wallet} />
              <ExchangeInfoRow
                label="Wallet address"
                value={exchangeInfo.wallet}
                copyLabel="Copy address"
                valueToCopy={exchangeInfo.wallet}
              />
              <ExchangeInfoRow
                label="Total amount"
                value={`${giveAmount} ${currentToken}`}
                copyLabel="Copy amount"
                valueToCopy={giveAmount}
              />
              <ExchangeInfoRow
                label="Credited amount"
                value={`${exchangeInfo.creditedAmount} ${currentToken}`}
                timestamp={Number(exchangeInfo.timestamp)}
                onExpired={() => console.log("expired")}
              />
              <ExchangeRow
                token={currentToken}
                currency={currentCurrency}
                rate={rate}
                isLoading={false}
              />
              <ExchangeInfoRow
                label="Amount to get"
                value={`${creditedGetAmount} ${
                  currentCurrency &&
                  isCurrencyDeclared(currentCurrency) &&
                  mapCurrencyName(currentCurrency)
                } (${currentCurrency})`}
              />
            </ExchangeInfoContainer>
          </FormContainer>
          <ExchangeButtonsContainer>
            <ExchangeButton onClick={onExchange} disabled={processingRequest}>
              {processingRequest ? "Please wait..." : "Exchange"}
            </ExchangeButton>
            <RefundButton onClick={() => setShowRefundModal(true)}>
              Refund
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
        currentStep != Step.Exchange &&
        (!isLoading ? (
          <NextButton onClick={handleNextStep} disabled={processingRequest}>
            {processingRequest ? "Please wait..." : "Next Step"}
          </NextButton>
        ) : (
          <Skeleton height={49} />
        ))}
      {exchangeInfo != null && showRefundModal && (
        <RefundModal
          getValue={creditedGetAmount}
          sentValue={exchangeInfo.creditedAmount.toString()}
          sentToken={tokens?.find((token) => token.value == currentToken)}
          getToken={currencies?.find(
            (currency) => currency.value == currentCurrency
          )}
          isLoading={refundRequestError?.isLoading}
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
          isLoading={refundError?.isLoading}
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

      {(showRefundModal ||
        showRefundWalletModal ||
        showRefundCodeModal ||
        showRefundInsufficient ||
        showRefundModalResult ||
        showRefundCodeInvalid) && <Background />}
    </Container>
  )
}

export default CurrencyForm
