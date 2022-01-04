import React, { useMemo, useCallback } from "react"
import styled from "styled-components"
import Slider from "@/shared/Slider"
import Element from "./Element"
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks"
import { setSelectedToken, swapAction } from "@/src/redux/cryptoSlice"
import { mobile } from "@/src/constants"
import useSliderConfig from "../sliderConfig"
import type { Token } from "@/src/BackendClient/types"
import type { ActionType } from "@/src/redux/cryptoSlice"

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

const mapTokens = (
  tokens: Token[],
  handleAction: (action: ActionType, token: Token) => void
) => {
  return tokens.map((token) => (
    <Element
      key={token.id}
      icon={token.logo_uri}
      symbol={token.symbol}
      onBuy={() => handleAction("BUY", token)}
      onSell={() => handleAction("SELL", token)}
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
  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )
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
    () => availableTokens && mapTokens(availableTokens, handleAction),
    [availableTokens, handleAction]
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
