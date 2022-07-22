import React, { useEffect, useState, useMemo } from "react"

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { setSelectedToken } from "@/lib/redux/crypto"
import { BackendClient } from "@/lib/backend/clients"
import { useIsomorphicLayoutEffect } from "@/lib/hooks"

import SellForm from "./sell-form"
import BuyForm from "./buy-form"
import { Option } from "@/shared/InputSelect/types"

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

const mapTokens = (tokens: Token[]): TokenOption[] =>
  tokens
    .filter((token) => token.enabled)
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

  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const selectedToken = useAppSelector((state) => state.crypto.selectedToken)
  const action = useAppSelector((state) => state.crypto.action)

  const tokens = useMemo(
    () => (availableTokens ? mapTokens(availableTokens) : null),
    [availableTokens]
  )
  const blockchains = useMemo(
    () => (availableBlockchains ? mapBlockchains(availableBlockchains) : null),
    [availableBlockchains]
  )

  const [payments, setPayments] = useState<FiatProvider[] | null>(null)
  const [currencies, setCurrencies] = useState<Option[] | null>(null)
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

  useEffect(() => {
    if (!selectedBlockchain) {
      return
    }

    const fetch = async (signal: AbortSignal) => {
      const responses = await Promise.all([
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

      const fiatProviders = responses[0]
      const fiatRates = responses[1]
      const liquidity = responses[2]

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

  return action == "BUY" ? (
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
