import React, { useState } from "react"
import Container from "./Container"
import InputSelect from "../../InputSelect"
import Hideable from "@/shared/Hideable"
import NextButton from "../../NextButton"
import FormContainer from "./FormContainer"
import ExchangeRow from "../../Exchange"
import NetworkRow from "./NetworkRow"
import type { Option } from "../../InputSelect/types"

type CurrencyFormProps = {
  defaultBlockchain: number
  blockchains: Option[] | null
  defaultCurrency: number
  currentCurrency: string | null
  currencies: Option[] | null
  defaultToken: number
  currentToken: string | null
  tokens: Option[] | null
  rate: number | null
  userInput: string
  setUserInput: (value: string) => void
  onBlockchainChange: (blockchain: string) => void
  onCurrencyChange: (currency: string) => void
  onTokenChange: (token: string) => void
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
  userInput,
  setUserInput,
  onBlockchainChange,
  onCurrencyChange,
  onTokenChange
}: CurrencyFormProps) {
  const [chainActive, setChainActive] = useState(false)
  const [giveActive, setGiveActive] = useState(false)
  const [getActive, setGetActive] = useState(false)

  let checkedBlockchains: Option[] | undefined
  if (blockchains) checkedBlockchains = blockchains
  let checkedCurrencies: Option[] | undefined
  if (currencies) checkedCurrencies = currencies
  let checkedTokens: Option[] | undefined
  if (tokens) checkedTokens = tokens

  let tokenAmount = 0
  if (rate && userInput != "") {
    tokenAmount = +(Number(userInput) / rate).toFixed(6)
  }

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
    const numberValue = Number(value)
    if (!isNaN(numberValue)) {
      setUserInput(value)
    }
  }

  if (!checkedBlockchains || !checkedTokens || !checkedCurrencies || !rate) {
    return <Container></Container>
  }

  return (
    <Container>
      <FormContainer>
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
        <Hideable hide={chainActive}>
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
          <Hideable hide={giveActive}>
            {currentToken && currentCurrency && (
              <ExchangeRow
                token={currentToken}
                currency={currentCurrency}
                rate={rate}
              />
            )}
            <InputSelect
              label="You get"
              id="get"
              options={checkedTokens}
              displayInSelect={1}
              onActiveChange={(active) => setGetActive(active)}
              defaultIndex={defaultToken}
              onSelect={onTokenChange}
              value={tokenAmount.toString()}
            />
            <Hideable hide={getActive}>
              <NetworkRow />
              <InputSelect label="Wallet address" id="wallet" changeable />
            </Hideable>
          </Hideable>
        </Hideable>
      </FormContainer>
      {!chainActive && !giveActive && !getActive && (
        <NextButton>Next Step</NextButton>
      )}
    </Container>
  )
}

export default CurrencyForm
