import React, { useState, useMemo, useEffect } from "react"
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
import { emailRegexp, floatRegexp, allowSkeletons } from "@/src/constants"
import Skeleton from "react-loading-skeleton"
import { useAppSelector } from "@/src/redux/hooks"
import { stringToPieces } from "@/src/helpers"
import { Step } from "./Steps"
import { mapCurrencyName, isCurrencyDeclared } from "@/src/currencies"
import type { Error } from "./types"
import type { PaymentOption } from "../../types"
import type { Option } from "../../InputSelect/types"
import type { SellTokenCreateData } from "@/src/BackendClient/types"

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
  createOrderData: SellTokenCreateData | null
  processingRequest: boolean
  onBlockchainChange: (blockchain: string) => void
  onCurrencyChange: (currency: string) => void
  onTokenChange: (token: string) => void
  onPaymentChange: (payment: string) => void
  onDetailsChange: (details: string) => void
  onHolderChange: (holder: string) => void
  onEmailChange: (email: string) => void
  onGiveAmountChange: (amount: string) => void
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
  currentDetails,
  currentHolder,
  currentEmail,
  giveAmount,
  rate,
  processingRequest,
  createOrderData,
  onBlockchainChange,
  onCurrencyChange,
  onTokenChange,
  onPaymentChange,
  onDetailsChange,
  onHolderChange,
  onEmailChange,
  onGiveAmountChange,
  onSubmit
}: CurrencyFormProps) {
  const [inputError, setInputError] = useState<Error>({})
  const [chainActive, setChainActive] = useState(false)
  const [giveActive, setGiveActive] = useState(false)
  const [getActive, setGetActive] = useState(false)
  const [paymentActive, setPaymentActive] = useState(false)
  const [step, setStep] = useState(Step.Details)
  const appLoaded = useAppSelector((state) => state.ui.appLoaded)

  const piecedDetails = useMemo(
    () => stringToPieces(currentDetails, 4, " "),
    [currentDetails]
  )

  useEffect(() => {
    if (createOrderData) {
      setStep(Step.Exchange)
    }
  }, [createOrderData])

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
    getAmount = (Number(giveAmount) * rate).toString()
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
    onHolderChange(value)
  }

  const handleEmailInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value
    onEmailChange(value)
  }

  const handleNextStep = () => {
    let errorObject: Error = {}

    errorObject[inputIds.give] = giveAmount == ""

    if (step == Step.Payment) {
      errorObject[inputIds.holder] = currentHolder == ""
      errorObject[inputIds.details] = currentDetails == ""

      if (currentEmail == "" || !emailRegexp.test(currentEmail)) {
        errorObject[inputIds.email] = true
      }
    }

    setInputError(errorObject)

    if (!Object.values(errorObject).includes(true)) {
      if (step == Step.Details) {
        setStep(Step.Payment)
      } else if (step == Step.Payment) {
        onSubmit()
      }
    }
  }

  const renderFields = () => {
    if (step == Step.Details) {
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
    } else if (step == Step.Payment) {
      return (
        <FormContainer>
          <InputSelectButton
            label="Back to"
            value="Order details"
            onClick={() => setStep(Step.Details)}
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
    } else if (step == Step.Exchange) {
      return (
        <>
          <FormContainer>
            <InputSelectButton
              label="Back to"
              value="Payment details"
              onClick={() => setStep(Step.Payment)}
            />
            <ExchangeInfoContainer>
              <ExchangeInfoRow
                label="Wallet address"
                value={createOrderData?.wallet}
                copyLabel="Copy address"
              />
              <ExchangeInfoRow
                label="Total amount"
                value={`${giveAmount} ${currentToken}`}
                copyLabel="Copy amount"
              />
              <ExchangeInfoRow
                label="Credited amount"
                value={`${giveAmount} ${currentToken}`}
              />
              <ExchangeRow
                token={currentToken}
                currency={currentCurrency}
                rate={rate}
                isLoading={false}
              />
              <ExchangeInfoRow
                label="Amount to get"
                value={`${getAmount} ${
                  currentCurrency &&
                  isCurrencyDeclared(currentCurrency) &&
                  mapCurrencyName(currentCurrency)
                } (${currentCurrency})`}
              />
            </ExchangeInfoContainer>
          </FormContainer>
          <ExchangeButtonsContainer>
            <ExchangeButton>Exchange</ExchangeButton>
            <RefundButton>Refund</RefundButton>
          </ExchangeButtonsContainer>
        </>
      )
    }
  }

  return (
    <Container formStep={step}>
      {renderFields()}
      {!chainActive &&
        !giveActive &&
        !getActive &&
        !paymentActive &&
        step != Step.Exchange &&
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
