import React, { useState, useEffect, useMemo } from "react"
import CurrencyForm from "./CurrencyForm"
import { useAppSelector } from "@/src/redux/hooks"
import type { Option } from "../InputSelect/types"
import type { FiatRate } from "@/src/BackendClient/types"

type BuyFormProps = {
  blockchains: Option[] | null
  currencies: Option[] | null
  tokens: Option[] | null
  rates: FiatRate[] | null
}

function BuyForm({ blockchains, currencies, tokens, rates }: BuyFormProps) {
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(
    null
  )
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
  const [userInput, setUserInput] = useState("10000")
  const currentRate = useMemo(() => {
    if (rates && selectedToken && selectedCurrency) {
      const rate = rates.find((rate) => rate.name == selectedToken)
      if (rate) {
        return rate.buy[selectedCurrency]
      }

      return null
    }

    return null
  }, [rates, selectedToken, selectedCurrency])
  const defaultCurrencyIndex = currencies
    ? currencies.findIndex((currency) => currency.value == currentCurrency)
    : 0

  useEffect(() => {
    if (!selectedBlockchain && blockchains) {
      setSelectedBlockchain(blockchains[0].value)
    }
  }, [blockchains, selectedBlockchain])

  useEffect(() => {
    setSelectedCurrency(currentCurrency)
  }, [currentCurrency])

  useEffect(() => {
    if (!selectedToken && tokens) {
      setSelectedToken(tokens[0].value)
    }
  }, [tokens, selectedToken])

  return (
    <CurrencyForm
      defaultBlockchain={0}
      blockchains={blockchains}
      defaultCurrency={defaultCurrencyIndex == -1 ? 0 : defaultCurrencyIndex}
      currentCurrency={selectedCurrency}
      currencies={currencies}
      defaultToken={0}
      currentToken={selectedToken}
      tokens={tokens}
      rate={currentRate}
      userInput={userInput}
      setUserInput={setUserInput}
      onBlockchainChange={(blockchain) => setSelectedBlockchain(blockchain)}
      onCurrencyChange={(currency) => setSelectedCurrency(currency)}
      onTokenChange={(token) => setSelectedToken(token)}
    />
  )
}

export default BuyForm
