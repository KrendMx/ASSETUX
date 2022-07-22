import React, { useMemo, useCallback } from "react"
import styled from "styled-components"

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { setSelectedToken, swapAction } from "@/lib/redux/crypto"
import { mobile } from "@/lib/data/constants"
import { mapCurrency } from "@/lib/data/currencies"
import { useSliderConfig } from "@/lib/hooks"

import Element from "./element"
import Slider from "@/shared/Slider"

import type { ExplorerData } from "@/components/common/crypto-manager/types"
import type { Token, MarketHistoryData } from "@/lib/backend/main/types"
import type { ActionType } from "@/lib/redux/crypto/types"
import type { CurrenciesType } from "@/lib/data/currencies"
import type { GraphData } from "./element/graph"

const Container = styled.section`
  display: block;
  width: 100%;
  height: 245px;

  // override page padding
  padding: 0 !important;

  @media only screen and (max-width: ${mobile}px) {
    height: auto;
  }
`

const mapMarketHistory = (
  marketHistory: MarketHistoryData[],
  currency: CurrenciesType
): GraphData[] => {
  const startHistory = marketHistory.at(0)

  if (!startHistory) {
    return []
  }

  const startTimestamp = Number(startHistory.timestamp)

  const marketHistoryLength = marketHistory.length

  const graphData = new Array<GraphData>(marketHistoryLength)

  for (let i = 0; i < marketHistory.length; i++) {
    graphData[i] = {
      x: Number(marketHistory[i]!.timestamp) - startTimestamp,
      y: marketHistory[i]!.price[currency]
    }
  }

  return graphData
}

const mapExplorerData = (
  explorerData: ExplorerData[],
  handleAction: (action: ActionType, token: Token) => void,
  currency: CurrenciesType,
  action: ActionType
) => {
  return explorerData
    .filter((element) => element.token.enabled && element.currency == currency)
    .sort((a, b) => b.buy - a.buy)
    .map((element) => (
      <Element
        key={element.id}
        icon={element.token.logo_uri}
        symbol={element.token.symbol}
        price={`${action == "SELL" ? element.sell : element.buy} ${mapCurrency(
          currency
        )}`}
        change24h={element.change24}
        marketHistory={
          element.token.market_history &&
          mapMarketHistory(element.token.market_history, currency)
        }
        onBuy={() => handleAction("BUY", element.token)}
        onSell={() => handleAction("SELL", element.token)}
      />
    ))
}

const getSkeletons = () => {
  const skeletons = []
  for (let i = 0; i < 6; i++) {
    skeletons.push(<Element key={i} />)
  }
  return skeletons
}

function CryptoSlide() {
  const dispatch = useAppDispatch()
  const explorerData = useAppSelector((state) => state.crypto.explorerData)
  const currentCurrency = useAppSelector((state) => state.ui.currentCurrency)
  const currentAction = useAppSelector((state) => state.crypto.action)
  const sliderConfig = useSliderConfig()

  const handleAction = useCallback(
    (action: ActionType, token: Token) => {
      dispatch(swapAction(action))
      dispatch(setSelectedToken(token))
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    },
    [dispatch]
  )

  const mappedTokens = useMemo(
    () =>
      explorerData &&
      mapExplorerData(
        explorerData,
        handleAction,
        currentCurrency,
        currentAction
      ),
    [explorerData, handleAction, currentCurrency, currentAction]
  )

  return (
    <Container>
      <Slider {...sliderConfig}>
        {mappedTokens ? mappedTokens : getSkeletons()}
      </Slider>
    </Container>
  )
}

export default CryptoSlide
