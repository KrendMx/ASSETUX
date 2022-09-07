import React, { useEffect, useState, useMemo } from "react"

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { setSelectedSellToken, setSelectedToken } from "@/lib/redux/crypto"
import { BackendClient } from "@/lib/backend/clients"
import { useIsomorphicLayoutEffect } from "@/lib/hooks"

import SellForm from "./sell-form"
import BuyForm from "./buy-form"
import { Option } from "@/components/common/input-select/types"

import {
  currencies as definedCurrencies,
  mapCurrency,
  mapCurrencyName,
  mapShortCurrencyName
} from "@/lib/data/currencies"
import { rateCheckInterval } from "@/lib/data/constants"

import type { TokenOption } from "./types"
import type {
  Token,
  FiatProvider,
  FiatRate,
  LiquidityData,
  Blockchain
} from "@/lib/backend/main/types"

export const mapTokens = (tokens: Token[]): TokenOption[] =>
  tokens
    // .filter((token) => token.enabled)
    .map((token) => ({
      value: token.symbol,
      icon: token.logo_uri,
      description: token.name,
      shortDescription: token.name,
      address: token.address
    }))

const mapBlockchains = (blockchains: Blockchain[]): Option[] =>
  blockchains.map((blockchain) => {
    return {
      value: blockchain.title,
      description: blockchain.title,
      icon: blockchain.logo
    }
  })

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

  const availableSellTokens = useAppSelector((state) => state.crypto.sellTokens)

  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const selectedToken = useAppSelector((state) => state.crypto.selectedToken)
  const selectedSellToken = useAppSelector(
    (state) => state.crypto.selectedSellToken
  )
  const action = useAppSelector((state) => state.crypto.action)

  const tokens = useMemo(
    () => (availableTokens ? mapTokens(availableTokens) : null),
    [availableTokens]
  )

  const tokensForSell = useMemo(
    () => (availableSellTokens ? mapTokens(availableSellTokens) : null),
    [availableSellTokens]
  )
  const blockchains = useMemo(
    () => (availableBlockchains ? mapBlockchains(availableBlockchains) : null),
    [availableBlockchains]
  )

  const [payments, setPayments] = useState<FiatProvider[] | null>(null)
  const [currenciesForBuy, setCurrenciesForBuy] = useState<Option[] | null>(
    null
  )
  const [currenciesForSell, setCurrenciesForSell] = useState<Option[] | null>(
    null
  )
  const [fiatRates, setFiatRates] = useState<FiatRate[] | null>(null)
  const [liquidityData, setLiquidityData] = useState<LiquidityData | null>(null)

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

  const handleTokenSellChange = (tokenSymbol: string) => {
    if (availableSellTokens) {
      const foundToken = availableSellTokens.find(
        (token) => token.symbol == tokenSymbol
      )
      if (foundToken) {
        dispatch(setSelectedSellToken(foundToken))
      }
    }
  }

  useEffect(() => {
    if (!selectedBlockchain) {
      return
    }

    const fetch = async (signal: AbortSignal) => {
      const [fiatProviders, fiatRates, liquidity] = await Promise.all([
        BackendClient.getFiatProviders({
          apiHost: selectedBlockchain.url,
          signal
        }),
        BackendClient.getFiatRates({
          apiHost: selectedBlockchain.url,
          signal
        }),
        BackendClient.checkLiquidity({
          apiHost: selectedBlockchain.url,
          chainId: selectedBlockchain.chain_id,
          signal
        })
      ])

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

    const controller = new AbortController()

    fetch(controller.signal)

    const rateInterval = setInterval(async () => {
      const responses = await Promise.all([
        BackendClient.getFiatRates({
          apiHost: selectedBlockchain.url,
          signal: controller.signal
        }),
        BackendClient.checkLiquidity({
          apiHost: selectedBlockchain.url,
          chainId: selectedBlockchain.chain_id,
          signal: controller.signal
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
      controller.abort()
      clearInterval(rateInterval)
    }
  }, [selectedBlockchain])

  useEffect(() => {
    setCurrenciesForBuy(
      definedCurrencies
        .map((currency) => ({
          value: currency,
          description: mapCurrencyName(currency),
          shortDescription:
            mapShortCurrencyName(currency) + " " + mapCurrency(currency)
        }))
        .filter(({ value }) =>
          buyPayments?.find(({ currency }) => currency === value)
        )
    )

    setCurrenciesForSell(
      definedCurrencies
        .map((currency) => ({
          value: currency,
          description: mapCurrencyName(currency),
          shortDescription:
            mapShortCurrencyName(currency) + " " + mapCurrency(currency)
        }))
        .filter(({ value }) =>
          sellPayments?.find(({ currency }) => currency === value)
        )
    )
  }, [sellPayments, buyPayments])
  return action == "BUY" ? (
    <BuyForm
      blockchains={blockchains}
      tokens={tokens}
      currencies={currenciesForBuy}
      rates={fiatRates}
      payments={buyPayments}
      serviceAvailable={liquidityData ? liquidityData.buy : null}
      currentBlockchain={selectedBlockchain}
      currentToken={selectedToken}
      currentCurrency={currentCurrency}
      onTokenChange={handleTokenChange}
    />
  ) : (
    <SellForm
      blockchains={blockchains}
      tokens={tokensForSell}
      currencies={currenciesForSell}
      rates={fiatRates}
      payments={sellPayments}
      serviceAvailable={liquidityData ? liquidityData.sell : null}
      currentBlockchain={selectedBlockchain}
      currentToken={selectedSellToken}
      currentCurrency={"RUB"}
      onTokenChange={handleTokenSellChange}
    />
  )
}

export default React.memo(FormController)
