import React, { useMemo, useCallback } from "react"
import styled from "styled-components"
import Slider from "@/shared/Slider"
import Element from "./Element"
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import { setSelectedToken, swapAction } from "@/src/redux/cryptoSlice"
import { mobile } from "@/src/constants"
import { mapCurrency } from "@/src/currencies"
import useSliderConfig from "../sliderConfig"
import type { ExplorerData } from "../CryptoManager/types"
import type { Token } from "@/src/BackendClient/types"
import type { ActionType } from "@/src/redux/cryptoSlice"
import type { CurrenciesType } from "@/src/currencies"

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

const mapExplorerData = (
  explorerData: ExplorerData[],
  handleAction: (action: ActionType, token: Token) => void,
  currency: CurrenciesType,
  action: ActionType
) => {
  return explorerData
    .filter((element) => element.currency == currency)
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
