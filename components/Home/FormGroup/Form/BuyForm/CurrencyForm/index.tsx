import React, { useState } from "react"
import styled from "styled-components"
import Container from "./Container"
import InputSelect from "../../InputSelect"
import Hideable from "@/shared/Hideable"
import NextButton from "../../NextButton"
import FormContainer from "./FormContainer"
import ExchangeRow from "../../Exchange"
import NetworkRow from "./NetworkRow"
import Step from "./Steps"
import { mobile } from "@/src/constants"
import Skeleton from "react-loading-skeleton"
import { useAppSelector } from "@/src/redux/hooks"
import type { PaymentOption } from "../../types"
import type { Option } from "../../InputSelect/types"

type HideableWithMarginProps = {
  margins?: boolean
}

const HideableWithMargin = styled(Hideable)<HideableWithMarginProps>`
  margin-top: ${(props) => (props.margins ? "16px" : "0px")};

  @media only screen and (max-width: ${mobile}px) {
    margin-top: ${(props) => (props.margins ? "13px" : "0px")};
  }
`

type CurrencyFormProps = {
  defaultBlockchain: number
  blockchains: Option[] | null
  defaultCurrency: number
  currentCurrency: string | null
  currencies: Option[] | null
  defaultToken: number
  currentToken: string | null
  tokens: Option[] | null
  defaultPayment: number
  payments: PaymentOption[] | null
  rate: number | null
  userInput: string
  firstLoad: boolean
  setUserInput: (value: string) => void
  onBlockchainChange: (blockchain: string) => void
  onCurrencyChange: (currency: string) => void
  onTokenChange: (token: string) => void
  onPaymentChange: (payment: string) => void
}

function CurrencyForm({
  defaultBlockchain,
  blockchains,
  defaultCurrency,
  currentCurrency,
  currencies,
  defaultToken,
  currentToken,
  tokens,
  rate,
  payments,
  defaultPayment,
  userInput,
  firstLoad,
  setUserInput,
  onBlockchainChange,
  onCurrencyChange,
  onTokenChange,
  onPaymentChange
}: CurrencyFormProps) {
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
  if (rate && userInput != "") {
    tokenAmount = (Number(userInput) / rate).toFixed(6)
  }

  const isLoading =
    firstLoad &&
    (!appLoaded ||
      !checkedBlockchains ||
      !checkedTokens ||
      !checkedCurrencies ||
      !rate)

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
    const numberValue = Number(value)
    if (!isNaN(numberValue)) {
      setUserInput(value)
    }
  }

  return (
    <Container step={step}>
      <FormContainer>
        {!isLoading ? (
          <InputSelect
            label="Blockchain"
            id="blockchain"
            selectLabel="You are currently using Assetux on"
            options={checkedBlockchains}
            displayInSelect={3}
            onActiveChange={(active) => setChainActive(active)}
            onSelect={onBlockchainChange}
            defaultIndex={defaultBlockchain}
            displayIcon
          />
        ) : (
          <Skeleton height={65} />
        )}
        <HideableWithMargin hide={chainActive} margins>
          {!isLoading ? (
            <InputSelect
              label="You give"
              id="give"
              value={userInput}
              onChange={handleInput}
              options={checkedCurrencies}
              onActiveChange={(active) => setGiveActive(active)}
              onSelect={onCurrencyChange}
              defaultIndex={defaultCurrency}
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
                  id="payment"
                  options={checkedPayments}
                  onSelect={onPaymentChange}
                  onActiveChange={(active) => setPaymentActive(active)}
                  defaultIndex={defaultPayment}
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
                  id="get"
                  options={checkedTokens}
                  displayInSelect={1}
                  onActiveChange={(active) => setGetActive(active)}
                  defaultIndex={defaultToken}
                  onSelect={onTokenChange}
                  value={tokenAmount}
                />
              ) : (
                <Skeleton height={65} />
              )}
              <HideableWithMargin hide={getActive}>
                <NetworkRow isLoading={isLoading} />
                {!isLoading ? (
                  <InputSelect label="Wallet address" id="wallet" changeable />
                ) : (
                  <Skeleton height={65} />
                )}
                <HideableWithMargin hide={false} margins={step == Step.Payment}>
                  {step == Step.Payment && (
                    <InputSelect label="Email" id="email" changeable />
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
          <NextButton
            onClick={() => {
              if (step == Step.Choice) {
                setStep(Step.Payment)
              }
            }}
          >
            Next Step
          </NextButton>
        ) : (
          <Skeleton height={49} />
        ))}
    </Container>
  )
}

export default CurrencyForm
