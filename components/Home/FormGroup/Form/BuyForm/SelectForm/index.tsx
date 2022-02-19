import React, { useState } from "react"
import Container from "./Container"
import InputSelect from "../../InputSelect"
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
import Skeleton from "react-loading-skeleton"
import { useAppSelector } from "@/src/redux/hooks"
import type { Error } from "./types"
import type { PaymentOption } from "../../types"
import type { Option } from "../../InputSelect/types"

let alreadyLoaded = false

const inputIds = {
  get: "get",
  give: "give",
  wallet: "wallet",
  email: "email",
  blockchains: "blockchains",
  payments: "payments"
}

type CurrencyFormProps = {
  currentStep: Step
  currentBlockchain: string | null
  blockchains: Option[] | null
  currentCurrency: string | null
  currencies: Option[] | null
  currentToken: string | null
  tokens: Option[] | null
  currentPayment: string | null
  payments: PaymentOption[] | null
  currentWallet: string
  giveAmount: string
  email: string
  rate: number | null
  processingRequest: boolean
  setCurrentStep: (step: Step) => void
  onBlockchainChange: (blockchain: string) => void
  onCurrencyChange: (currency: string) => void
  onTokenChange: (token: string) => void
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
  payments,
  currentWallet,
  giveAmount,
  email,
  rate,
  processingRequest,
  setCurrentStep,
  onBlockchainChange,
  onCurrencyChange,
  onTokenChange,
  onPaymentChange,
  onWalletChange,
  onGiveAmountChange,
  onEmailChange,
  onSubmit
}: CurrencyFormProps) {
  const [inputError, setInputError] = useState<Error>({})
  const [chainActive, setChainActive] = useState(false)
  const [giveActive, setGiveActive] = useState(false)
  const [getActive, setGetActive] = useState(false)
  const [paymentActive, setPaymentActive] = useState(false)
  const appLoaded = useAppSelector((state) => state.ui.appLoaded)

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

  const handleNextStep = () => {
    // validation

    let errorObject: Error = {}
    if (giveAmount == "") {
      errorObject[inputIds.give] = "Invalid give amount"
    }
    if (currentStep == Step.Credentials) {
      if (email == "" || !emailRegexp.test(email)) {
        errorObject[inputIds.email] = "Invalid email"
      }
      if (currentWallet == "" || !walletRegexp.test(currentWallet)) {
        errorObject[inputIds.wallet] = "Invalid wallet address"
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
                  label="Payment Method"
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
                    label="You get"
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
            label="Back to"
            value="Order details"
            onClick={() => setCurrentStep(Step.Details)}
          />
          <NetworkRow isLoading={isLoading} />
          <InputSelect
            label="Wallet address"
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
              label="Email"
              id={inputIds.email}
              value={email}
              error={inputError[inputIds.email]}
              onChange={handleEmailInput}
              changeable
            />
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
            {processingRequest ? "Please wait..." : "Next Step"}
          </NextButton>
        ) : (
          <Skeleton height={49} />
        ))}
    </Container>
  )
}

export default CurrencyForm
