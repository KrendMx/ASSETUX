import React, { useEffect, useState, useMemo, useRef } from "react"
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import { setSelectedToken } from "@/src/redux/cryptoSlice"
import BackendClient from "@/src/BackendClient"
import SellForm from "./SellForm"
import BuyForm from "./BuyForm"
import { Option } from "./InputSelect/types"
import {
  currencies as definedCurrencies,
  mapCurrency,
  mapCurrencyName
} from "@/src/currencies"
import { rateCheckInterval } from "@/src/constants"
import type { TokenOption } from "./types"
import type { CurrenciesType } from "@/src/currencies"
import type { Token, FiatProvider, FiatRate } from "@/src/BackendClient/types"

const mapShortCurrencyName = (currency: CurrenciesType) => {
  switch (currency) {
    case "RUB":
      return "Rus"
    case "UAH":
      return "Grn"
  }
}

const mapTokens = (tokens: Token[]) => {
  const mappedTokens: TokenOption[] = []
  for (const token of tokens) {
    if (token.enabled) {
      mappedTokens.push({
        value: token.symbol,
        icon: token.logo_uri,
        description: token.name,
        shortDescription: token.name,
        address: token.address
      })
    }
  }

  return mappedTokens
}

function FormController() {
  const dispatch = useAppDispatch()
  const selectedBlockchain = useAppSelector(
    (state) => state.crypto.selectedBlockchain
  )
  const availableBlockchains = useAppSelector(
    (state) => state.crypto.availableBlockchains
  )
  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const selectedToken = useAppSelector((state) => state.crypto.selectedToken)
  const action = useAppSelector((state) => state.crypto.action)
  const [blockchains, setBlockchains] = useState<Option[] | null>(null)
  const [tokens, setTokens] = useState<TokenOption[] | null>(null)
  const [payments, setPayments] = useState<FiatProvider[] | null>(null)
  const [currencies, setCurrencies] = useState<Option[] | null>(null)
  const [fiatRates, setFiatRates] = useState<FiatRate[] | null>(null)
  const [switchedTabs, setSwitchedTabs] = useState(false)
  const isUnmounted = useRef(false)

  const buyPayments = useMemo(() => {
    return payments && payments.filter((payment) => payment.type == "BUY")
  }, [payments])

  const handleTokenChange = (tokenSymbol: string) => {
    if (availableTokens) {
      const foundToken = availableTokens.find(
        (token) => token.symbol == tokenSymbol
      )
      if (foundToken) {
        dispatch(setSelectedToken(foundToken))
      }
    }
  }

  useEffect(() => {
    return () => {
      isUnmounted.current = true
    }
  }, [])

  useEffect(() => {
    if (selectedBlockchain) {
      const fetch = async () => {
        const responses = await Promise.all([
          BackendClient.getFiatProviders({ apiHost: selectedBlockchain.url }),
          BackendClient.getFiatRates({ apiHost: selectedBlockchain.url })
        ])

        if (!isUnmounted.current) {
          if (responses[0].status == 200) {
            const payments = responses[0].data

            if (payments) {
              setPayments(payments)
            }
          }

          if (responses[1].status == 200) {
            const fiatRates = responses[1].data

            if (fiatRates) {
              setFiatRates(fiatRates)
            }
          }
        }
      }

      setCurrencies(
        definedCurrencies.map((currency) => {
          return {
            value: currency,
            description: mapCurrencyName(currency),
            shortDescription:
              mapShortCurrencyName(currency) + " " + mapCurrency(currency)
          }
        })
      )

      fetch()

      const rateInterval = setInterval(async () => {
        const response = await BackendClient.getFiatRates({
          apiHost: selectedBlockchain.url
        })
        if (response.status == 200) {
          const fiatRates = response.data

          if (fiatRates) {
            setFiatRates(fiatRates)
          }
        }
      }, rateCheckInterval)

      return () => {
        clearInterval(rateInterval)
      }
    }
  }, [selectedBlockchain])

  useEffect(() => {
    if (action == "SELL") {
      setSwitchedTabs(true)
    }
  }, [action])

  useEffect(() => {
    if (availableBlockchains) {
      setBlockchains(
        availableBlockchains.map((blockchain) => {
          return {
            value: blockchain.title,
            description: blockchain.title,
            icon: blockchain.logo
          }
        })
      )
    }
  }, [availableBlockchains])

  useEffect(() => {
    if (availableTokens) {
      setTokens(mapTokens(availableTokens))
    }
  }, [availableTokens])

  return action == "BUY" ? (
    <BuyForm
      blockchains={blockchains}
      tokens={tokens}
      currencies={currencies}
      rates={fiatRates}
      payments={buyPayments}
      firstLoad={!switchedTabs}
      currentBlockchain={selectedBlockchain}
      currentToken={selectedToken}
      currentCurrency={currentCurrency}
      onTokenChange={handleTokenChange}
    />
  ) : (
    <SellForm
      blockchains={blockchains}
      tokens={tokens}
      currencies={currencies}
      rates={fiatRates}
      payments={payments}
      firstLoad={false}
      currentBlockchain={selectedBlockchain}
      currentToken={selectedToken}
      currentCurrency={currentCurrency}
      onTokenChange={handleTokenChange}
    />
  )
}

export default React.memo(FormController)
