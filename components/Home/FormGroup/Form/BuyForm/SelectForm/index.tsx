import React, { useState } from "react"
import Container from "./Container"
import InputSelect from "../../InputSelect"
import NextButton from "../../NextButton"
import FormContainer from "./FormContainer"
import ExchangeRow from "../../Exchange"
import NetworkRow from "../../NetworkRow"
import HideableWithMargin from "../../HideableWithMargin"
import Step from "./Steps"
import { emailRegexp, floatRegexp, allowSkeletons } from "@/src/constants"
import Skeleton from "react-loading-skeleton"
import { useAppSelector } from "@/src/redux/hooks"
import type { Error } from "./types"
import type { PaymentOption } from "../../types"
import type { Option } from "../../InputSelect/types"

const inputIds = {
  get: "get",
  give: "give",
  wallet: "wallet",
  email: "email",
  blockchains: "blockchains",
  payments: "payments"
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
  currentWallet: string
  giveAmount: string
  email: string
  rate: number | null
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
  const [step, setStep] = useState(Step.Choice)
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
    tokenAmount = (Number(giveAmount) / rate).toFixed(6)
  }

  const isLoading =
    allowSkeletons &&
    (!appLoaded ||
      !checkedBlockchains ||
      !checkedTokens ||
      !checkedCurrencies ||
      !rate)

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
    errorObject[inputIds.wallet] = currentWallet == ""
    errorObject[inputIds.give] = giveAmount == ""
    if (step == Step.Payment) {
      if (email == "" || !emailRegexp.test(email)) {
        errorObject[inputIds.email] = true
      }
    }

    setInputError(errorObject)

    // actions

    if (!Object.values(errorObject).includes(true)) {
      if (step == Step.Choice) {
        setStep(Step.Payment)
      } else if (step == Step.Payment) {
        onSubmit()
      }
    }
  }

  return (
    <Container formStep={step}>
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
          <HideableWithMargin hide={giveActive} margins={step == Step.Payment}>
            {step == Step.Payment &&
              (!isLoading ? (
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
              ))}
            <HideableWithMargin hide={paymentActive}>
              <ExchangeRow
                token={currentToken}
                currency={currentCurrency}
                rate={rate}
                isLoading={isLoading}
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
              <HideableWithMargin hide={getActive}>
                <NetworkRow isLoading={isLoading} />
                {!isLoading ? (
                  <InputSelect
                    label="Wallet address"
                    id={inputIds.wallet}
                    onChange={handleWalletInput}
                    value={currentWallet}
                    error={inputError[inputIds.wallet]}
                    changeable
                  />
                ) : (
                  <Skeleton height={65} />
                )}
                <HideableWithMargin hide={false} margins={step == Step.Payment}>
                  {step == Step.Payment && (
                    <InputSelect
                      label="Email"
                      id={inputIds.email}
                      value={email}
                      error={inputError[inputIds.email]}
                      onChange={handleEmailInput}
                      changeable
                    />
                  )}
                </HideableWithMargin>
              </HideableWithMargin>
            </HideableWithMargin>
          </HideableWithMargin>
        </HideableWithMargin>
      </FormContainer>
      {!chainActive &&
        !giveActive &&
        !getActive &&
        !paymentActive &&
        (!isLoading ? (
          <NextButton onClick={handleNextStep}>Next Step</NextButton>
        ) : (
          <Skeleton height={49} />
        ))}
    </Container>
  )
}

export default CurrencyForm
