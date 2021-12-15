import React, { useEffect, useState } from "react"
import { useAppSelector } from "@/src/redux/hooks"
import dynamic from "next/dynamic"
import BackendClient from "@/src/BackendClient"
import { Option } from "./InputSelect/types"
import {
  currencies as definedCurrencies,
  mapCurrency,
  mapCurrencyName
} from "@/src/currencies"
import { rateCheckInterval } from "@/src/constants"
import type { CurrenciesType } from "@/src/currencies"
import type { Token, FiatProvider, FiatRate } from "@/src/BackendClient/types"
import type { PaymentOption } from "./types"

const SellForm = dynamic(() => import("./SellForm"))
const BuyForm = dynamic(() => import("./BuyForm"))

const mapShortCurrencyName = (currency: CurrenciesType) => {
  switch (currency) {
    case "RUB":
      return "Rus"
    case "UAH":
      return "Grn"
  }
}

const mapTokens = (tokens: Token[]) => {
  const mappedTokens: Option[] = []
  for (const token of tokens) {
    if (token.enabled) {
      mappedTokens.push({
        value: token.symbol,
        icon: token.logo_uri,
        description: token.name,
        shortDescription: token.name
      })
    }
  }

  return mappedTokens
}

const mapPayments = (payments: FiatProvider[]) => {
  const mappedPayments: PaymentOption[] = []
  for (const currency of payments) {
    mappedPayments.push({
      value: currency.method,
      min: currency.min,
      max: currency.max
    })
  }

  return mappedPayments
}

function FormController() {
  const action = useAppSelector((state) => state.crypto.action)
  const [blockchains, setBlockchains] = useState<Option[] | null>(null)
  const [tokens, setTokens] = useState<Option[] | null>(null)
  const [payments, setPayments] = useState<PaymentOption[] | null>(null)
  const [currencies, setCurrencies] = useState<Option[] | null>(null)
  const [fiatRates, setFiatRates] = useState<FiatRate[] | null>(null)

  useEffect(() => {
    setBlockchains([
      {
        value: "BSC",
        description: "Binance Smart Chain",
        icon: "/blockchains/bsc.png"
      }
    ])

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

    const fetch = async () => {
      const responses = await Promise.all([
        BackendClient.getTokens(),
        BackendClient.getFiatProviders(),
        BackendClient.getFiatRates()
      ])

      if (responses[0].status == 200) {
        const tokens = responses[0].data

        const mappedTokens = tokens ? mapTokens(tokens) : null

        setTokens(mappedTokens)
      }

      if (responses[1].status == 200) {
        const payments = responses[1].data

        const mappedPayments = payments ? mapPayments(payments) : null

        setPayments(mappedPayments)
      }

      if (responses[2].status == 200) {
        const fiatRates = responses[2].data

        if (fiatRates) {
          setFiatRates(fiatRates)
        }
      }
    }

    fetch()

    const rateInterval = setInterval(async () => {
      const response = await BackendClient.getFiatRates()
      if (response.status == 200) {
        const fiatRates = response.data

        if (fiatRates) {
          setFiatRates(fiatRates)

          console.log(fiatRates)
        }
      }
    }, rateCheckInterval)

    return () => {
      clearInterval(rateInterval)
    }
  }, [])

  return action == "BUY" ? (
    <BuyForm
      blockchains={blockchains}
      tokens={tokens}
      currencies={currencies}
      rates={fiatRates}
    />
  ) : (
    <SellForm />
  )
}

export default React.memo(FormController)