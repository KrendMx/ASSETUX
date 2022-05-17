import React, { useEffect, useState, useMemo, useRef } from "react"
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import { setSelectedToken } from "@/src/redux/cryptoSlice"
import BackendClient from "@/src/BackendClient"
import { useIsomorphicLayoutEffect } from "@/src/hooks"

import SellForm from "./SellForm"
import BuyForm from "./BuyForm"
import BuyPending from "./BuyForm/Pending"
import { Option } from "@/shared/InputSelect/types"

import {
  currencies as definedCurrencies,
  mapCurrency,
  mapCurrencyName
} from "@/src/currencies"
import { rateCheckInterval } from "@/src/constants"

import type { TokenOption } from "./types"
import type { CurrenciesType } from "@/src/currencies"
import type {
  Token,
  FiatProvider,
  FiatRate,
  LiquidityData
} from "@/src/BackendClient/types"

const mapShortCurrencyName = (currency: CurrenciesType) => {
  switch (currency) {
    case "RUB":
      return "Rus"
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
  const [liquidityData, setLiquidityData] = useState<LiquidityData | null>(null)
  const [displayBuyPending, setDisplayBuyPendings] = useState(false)

  const isUnmounted = useRef(false)

  const buyPayments = useMemo(() => {
    return payments && payments.filter((payment) => payment.type == "BUY")
  }, [payments])

  const sellPayments = useMemo(() => {
    return payments && payments.filter((payment) => payment.type == "SELL")
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

  useIsomorphicLayoutEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const action = query.get("action")
    const id = query.get("id")

    if (action == "sell") {
      return
    }

    if (id) {
      setDisplayBuyPendings(true)
    }
  }, [])

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
          BackendClient.getFiatRates({ apiHost: selectedBlockchain.url }),
          BackendClient.checkLiquidity({
            apiHost: selectedBlockchain.url,
            chainId: selectedBlockchain.chain_id
          })
        ])

        const fiatProviders = responses[0]
        const fiatRates = responses[1]
        const liquidity = responses[2]

        if (!isUnmounted.current) {
          if (fiatProviders.state == "success") {
            setPayments(fiatProviders.data)
          }

          if (fiatRates.state == "success") {
            setFiatRates(fiatRates.data)
          }

          if (liquidity.state == "success") {
            setLiquidityData(liquidity.data)
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
        const responses = await Promise.all([
          BackendClient.getFiatRates({
            apiHost: selectedBlockchain.url
          }),
          BackendClient.checkLiquidity({
            apiHost: selectedBlockchain.url,
            chainId: selectedBlockchain.chain_id
          })
        ])

        const fiatRates = responses[0]
        const liquidity = responses[1]

        if (fiatRates.state == "success") {
          setFiatRates(fiatRates.data)
        }

        if (liquidity.state == "success") {
          setLiquidityData(liquidity.data)
        }
      }, rateCheckInterval)

      return () => {
        clearInterval(rateInterval)
      }
    }
  }, [selectedBlockchain])

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
    displayBuyPending ? (
      <BuyPending />
    ) : (
      <BuyForm
        blockchains={blockchains}
        tokens={tokens}
        currencies={currencies}
        rates={fiatRates}
        payments={buyPayments}
        serviceAvailable={liquidityData ? liquidityData.buy : null}
        currentBlockchain={selectedBlockchain}
        currentToken={selectedToken}
        currentCurrency={currentCurrency}
        onTokenChange={handleTokenChange}
      />
    )
  ) : (
    <SellForm
      blockchains={blockchains}
      tokens={tokens}
      currencies={currencies}
      rates={fiatRates}
      payments={sellPayments}
      serviceAvailable={liquidityData ? liquidityData.sell : null}
      currentBlockchain={selectedBlockchain}
      currentToken={selectedToken}
      currentCurrency={currentCurrency}
      onTokenChange={handleTokenChange}
    />
  )
}

export default React.memo(FormController)
