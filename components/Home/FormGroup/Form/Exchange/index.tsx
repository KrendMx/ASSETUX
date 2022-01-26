import React, { useState } from "react"
import styled from "styled-components"
import ExchangeStat from "./ExchangeStat"
import ExchangeHelp from "./ExchangeHelp"
import Help from "../Help"
import { mobile } from "@/src/constants"
import Skeleton from "react-loading-skeleton"

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 0 14px;
  font-size: 0.8em;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.865em;
    margin: 11px 0;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
  }
`

type ExchangeProps = {
  token: string | null
  currency: string | null
  rate: number | null
  isLoading: boolean
}

function Exchange({ token, currency, rate, isLoading }: ExchangeProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Container>
      {!isLoading ? (
        <>
          <ExchangeStat>
            1 {token} = {rate} {currency}
          </ExchangeStat>
          <ExchangeHelp onMouseEnter={() => {}} onMouseLeave={() => {}}>
            All fees included
          </ExchangeHelp>
          {hovered && (
            <Help offsetY={14}>
              The network you selected is BSC, please confirm that your
              withdrawal address supports the Binance Smart Chain network. If
              the other platform does not support it, your assets may be lost.
            </Help>
          )}
        </>
      ) : (
        <Skeleton containerClassName="skeletonFlexContainer" />
      )}
    </Container>
  )
}

export default Exchange
