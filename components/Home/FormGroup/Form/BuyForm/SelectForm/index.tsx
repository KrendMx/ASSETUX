import React, { useState, useMemo } from "react"
import { useIsomorphicLayoutEffect } from "@/src/hooks"
import { useTranslation } from "next-i18next"
import Skeleton from "react-loading-skeleton"

import Container from "./Container"
import InputSelect from "@/shared/InputSelect"
import InputSelectButton from "../../InputSelectButton"
import NextButton from "../../NextButton"
import FormContainer from "./FormContainer"
import ExchangeRow from "../../Exchange"
import NetworkRow from "../../NetworkRow"
import HideableWithMargin from "../../HideableWithMargin"
import Step from "./Steps"
import {
  emailRegexp,
  floatRegexp,
  allowSkeletons,
  walletRegexp
} from "@/src/constants"
import { useAppSelector } from "@/src/redux/hooks"

import { stringToPieces } from "@/src/helpers"

import type { Error } from "./types"
import type { PaymentOption } from "../../types"
import type { Option } from "@/shared/InputSelect/types"

let alreadyLoaded = false

const inputIds = {
  get: "get",
  give: "give",
  wallet: "wallet",
  email: "email",
  blockchains: "blockchains",
  payments: "payments",
  details: "details"
}

type CurrencyFormProps = {
  currentStep: Step
  currentBlockchain: string | null
  blockchains: Option[] | null
  currentCurrency: string | null
  currencies: Option[] | null
  currentToken: string | null
  tokens: Option[] | null
  currentDetails: string
  currentPayment: string | null
  payments: PaymentOption[] | null
  currentWallet: string
  giveAmount: string
  email: string
  rate: number | null
  processingRequest: boolean
  cardError: string
  setCurrentStep: (step: Step) => void
  onBlockchainChange: (blockchain: string) => void
  onCurrencyChange: (currency: string) => void
  onTokenChange: (token: string) => void
  onDetailsChange: (details: string) => void
  onPaymentChange: (payment: string) => void
  onWalletChange: (wallet: string) => void
  onGiveAmountChange: (amount: string) => void
  onEmailChange: (email: string) => void
  onSubmit: () => void
}

function CurrencyForm({
  currentStep,
  currentBlockchain,
  blockchains,
  currentCurrency,
  currencies,
  currentToken,
  tokens,
  currentPayment,
  currentDetails,
  payments,
  currentWallet,
  giveAmount,
  email,
  rate,
  processingRequest,
  cardError,
  setCurrentStep,
  onBlockchainChange,
  onCurrencyChange,
  onTokenChange,
  onPaymentChange,
  onDetailsChange,
  onWalletChange,
  onGiveAmountChange,
  onEmailChange,
  onSubmit
}: CurrencyFormProps) {
  const { t } = useTranslation("home")

  const [inputError, setInputError] = useState<Error>({})
  const [chainActive, setChainActive] = useState(false)
  const [giveActive, setGiveActive] = useState(false)
  const [getActive, setGetActive] = useState(false)
  const [paymentActive, setPaymentActive] = useState(false)
  const appLoaded = useAppSelector((state) => state.ui.appLoaded)

  const piecedDetails = useMemo(
    () => stringToPieces(currentDetails, 4, " "),
    [currentDetails]
  )

  useIsomorphicLayoutEffect(() => {
    const errorRanges = checkRanges(Number(giveAmount))

    if (errorRanges) {
      setInputError({
        ...inputError,
        [inputIds.give]: errorRanges
      })
    } else {
      setInputError({
        ...inputError,
        [inputIds.give]: undefined
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPayment])

  let checkedBlockchains: Option[] | undefined
  if (blockchains) checkedBlockchains = blockchains
  let checkedCurrencies: Option[] | undefined
  if (currencies) checkedCurrencies = currencies
  let checkedTokens: Option[] | undefined
  if (tokens) checkedTokens = tokens
  let checkedPayments: Option[] | undefined
  if (payments) checkedPayments = payments

  let tokenAmount = ""
  if (rate && giveAmount != "") {
    tokenAmount = (Number(giveAmount) / rate).toFixed(2)
  }

  const currentPaymentOption = payments?.find(
    (payment) => payment.value == currentPayment
  )

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

  const checkRanges = (value: number): string | null => {
    if (!currentPaymentOption) {
      return null
    }

    if (value < currentPaymentOption.min || value > currentPaymentOption.max) {
      if (value > currentPaymentOption.max) {
        return t("home:buy_maximumIs") + " " + currentPaymentOption.max
      } else {
        return t("home:buy_minimumIs") + " " + currentPaymentOption.min
      }
    } else {
      return null
    }
  }

  const handleGiveInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    if (value == "" || floatRegexp.test(value)) {
      const errorRanges = checkRanges(Number(value))

      if (errorRanges) {
        setInputError({
          ...inputError,
          [inputIds.give]: errorRanges
        })
      } else {
        setInputError({
          ...inputError,
          [inputIds.give]: undefined
        })
      }

      onGiveAmountChange(value)
    }
  }

  const handleWalletInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value
    onWalletChange(value)
  }

  const handleEmailInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value
    onEmailChange(value)
  }

  const handleDetailsInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value.replaceAll(" ", "")
    const validated = /^[0-9]*$/.test(value)
    validated && onDetailsChange(value)
  }

  const handleNextStep = () => {
    // validation

    let errorObject: Error = {}
    if (giveAmount == "") {
      errorObject[inputIds.give] = t("home:buy_invalidGive")
    } else {
      const errorRanges = checkRanges(Number(giveAmount))

      if (errorRanges) {
        errorObject[inputIds.give] = errorRanges
      }
    }
    if (currentStep == Step.Credentials) {
      if (email == "" || !emailRegexp.test(email)) {
        errorObject[inputIds.email] = t("home:buy_invalidEmail")
      }

      if (currentWallet == "" || !walletRegexp.test(currentWallet)) {
        errorObject[inputIds.wallet] = t("home:buy_invalidWallet")
      }

      if (currentDetails == "") {
        errorObject[inputIds.details] = t("home:buy_invalidCard")
      }
    }

    setInputError(errorObject)

    // actions

    if (Object.keys(errorObject).length == 0) {
      if (currentStep == Step.Details) {
        setCurrentStep(Step.Credentials)
      } else if (currentStep == Step.Credentials) {
        onSubmit()
      }
    }
  }

  const renderFields = () => {
    if (currentStep == Step.Details) {
      return (
        <FormContainer>
          {!isLoading ? (
            <InputSelect
              label={t("home:buy_blockchain")}
              id={inputIds.blockchains}
              selectLabel={t("home:buy_blockchainLabel")}
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
                label={t("home:buy_give")}
                id={inputIds.give}
                value={giveAmount}
                onChange={handleGiveInput}
                options={checkedCurrencies}
                onActiveChange={(active) => setGiveActive(active)}
                onSelect={onCurrencyChange}
                error={inputError[inputIds.give]}
                selectedValue={currentCurrency}
                changeable
              />
            ) : (
              <Skeleton height={65} />
            )}
            <HideableWithMargin hide={giveActive} margins>
              {!isLoading ? (
                <InputSelect
                  label={t("home:buy_payment")}
                  id={inputIds.payments}
                  options={checkedPayments}
                  onSelect={onPaymentChange}
                  onActiveChange={(active) => setPaymentActive(active)}
                  selectedValue={currentPayment}
                  displayInSelect={1}
                  displayIcon
                />
              ) : (
                <Skeleton height={65} />
              )}
              <HideableWithMargin hide={paymentActive}>
                <ExchangeRow
                  token={currentToken}
                  currency={currentCurrency}
                  rate={rate}
                  isLoading={isLoading}
                  margins
                />
                {!isLoading ? (
                  <InputSelect
                    label={t("home:buy_get")}
                    id={inputIds.get}
                    options={checkedTokens}
                    displayInSelect={1}
                    onActiveChange={(active) => setGetActive(active)}
                    onSelect={onTokenChange}
                    value={tokenAmount}
                    selectedValue={currentToken}
                  />
                ) : (
                  <Skeleton height={65} />
                )}
              </HideableWithMargin>
            </HideableWithMargin>
          </HideableWithMargin>
        </FormContainer>
      )
    } else if (currentStep == Step.Credentials) {
      return (
        <FormContainer>
          <InputSelectButton
            label={t("home:buy_backTo")}
            value={t("home:buy_orderDetails")}
            onClick={() => setCurrentStep(Step.Details)}
          />
          <NetworkRow isLoading={isLoading} />
          <InputSelect
            label={t("home:buy_wallet")}
            id={inputIds.wallet}
            onChange={handleWalletInput}
            value={currentWallet}
            error={inputError[inputIds.wallet]}
            placeholder={
              inputError[inputIds.wallet]
                ? ""
                : "0x04A6eDc2Cd603D7a1D875479444A8ad2CEDf6d5f"
            }
            changeable
          />
          <HideableWithMargin hide={false} margins>
            <InputSelect
              label={t("home:buy_email")}
              id={inputIds.email}
              value={email}
              error={inputError[inputIds.email]}
              onChange={handleEmailInput}
              changeable
            />
            <HideableWithMargin hide={false} margins>
              <InputSelect
                label={t("home:buy_cardNumber")}
                id={inputIds.details}
                onChange={handleDetailsInput}
                value={piecedDetails}
                error={cardError || inputError[inputIds.details]}
                changeable
              />
            </HideableWithMargin>
          </HideableWithMargin>
        </FormContainer>
      )
    }
  }

  return (
    <Container formStep={currentStep} lastSelectorActive={getActive}>
      {renderFields()}
      {!chainActive &&
        !giveActive &&
        !getActive &&
        !paymentActive &&
        (!isLoading ? (
          <NextButton onClick={handleNextStep}>
            {processingRequest ? t("home:buy_wait") : t("home:buy_next")}
          </NextButton>
        ) : (
          <Skeleton height={49} />
        ))}
    </Container>
  )
}

export default CurrencyForm
