import React, { useMemo } from "react"
import styled from "styled-components"
import Slider from "@/shared/Slider"
import Element from "./Element"
import { useAppSelector } from "@/src/redux/hooks"
import { mobile } from "@/src/constants"
import useSliderConfig from "../sliderConfig"
import type { Token } from "@/src/BackendClient/types"

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

const mapTokens = (tokens: Token[]) => {
  return tokens.map((token) => (
    <Element key={token.id} icon={token.logo_uri} symbol={token.symbol} />
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
  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )
  const sliderConfig = useSliderConfig()

  const mappedTokens = useMemo(
    () => availableTokens && mapTokens(availableTokens),
    [availableTokens]
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
