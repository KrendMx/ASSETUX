import React, { useState, useMemo } from "react"
import Container from "./Container"
import InputSelect from "../../InputSelect"
import NextButton from "../../NextButton"
import FormContainer from "./FormContainer"
import ExchangeRow from "../../Exchange"
import HideableWithMargin from "../../HideableWithMargin"
import { emailRegexp, floatRegexp, allowSkeletons } from "@/src/constants"
import Skeleton from "react-loading-skeleton"
import { useAppSelector } from "@/src/redux/hooks"
import { stringToPieces } from "@/src/helpers"
import type { Error } from "./types"
import type { PaymentOption } from "../../types"
import type { Option } from "../../InputSelect/types"

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
  const appLoaded = useAppSelector((state) => state.ui.appLoaded)

  const piecedDetails = useMemo(
    () => stringToPieces(currentDetails, 4, " "),
    [currentDetails]
  )

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
    errorObject[inputIds.holder] = currentHolder == ""
    errorObject[inputIds.details] = currentDetails == ""
    errorObject[inputIds.give] = giveAmount == ""

    if (currentEmail == "" || !emailRegexp.test(currentEmail)) {
      errorObject[inputIds.email] = true
    }

    setInputError(errorObject)

    if (!Object.values(errorObject).includes(true)) {
      onSubmit()
    }
  }

  return (
    <Container>
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
                selectedValue={currentToken}
                value={tokenAmount}
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
              <HideableWithMargin hide={paymentActive} margins>
                {!isLoading ? (
                  <InputSelect
                    label="Card Number"
                    id={inputIds.details}
                    onChange={handleDetailsInput}
                    value={piecedDetails}
                    error={inputError[inputIds.details]}
                    changeable
                  />
                ) : (
                  <Skeleton height={65} />
                )}
                <HideableWithMargin hide={false} margins>
                  {!isLoading ? (
                    <InputSelect
                      label="Card Holder"
                      id={inputIds.holder}
                      onChange={handleHolderInput}
                      value={currentHolder}
                      error={inputError[inputIds.holder]}
                      changeable
                    />
                  ) : (
                    <Skeleton height={65} />
                  )}
                </HideableWithMargin>
                <HideableWithMargin hide={false} margins>
                  {!isLoading ? (
                    <InputSelect
                      label="Email"
                      id={inputIds.email}
                      onChange={handleEmailInput}
                      value={currentEmail}
                      error={inputError[inputIds.email]}
                      changeable
                    />
                  ) : (
                    <Skeleton height={65} />
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
