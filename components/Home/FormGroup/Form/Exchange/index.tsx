import React, { useState } from "react"
import styled from "styled-components"
import ExchangeStat from "./ExchangeStat"
import ExchangeHelp from "./ExchangeHelp"
import Help from "../Help"
import { mobile } from "@/src/constants"

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 0 14px;
  font-size: 1em;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.085em;
    margin: 11px 0;
  }
`

function Exchange() {
  const [hovered, setHovered] = useState(false)

  return (
    <Container>
      <ExchangeStat>1 BCT = 4,308,216.43 RUB</ExchangeStat>
      <ExchangeHelp
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        All fees included
      </ExchangeHelp>
      {hovered && (
        <Help offsetY={14}>
          The network you selected is BSC, please confirm that your withdrawal
          address supports the Binance Smart Chain network. If the other
          platform does not support it, your assets may be lost.
        </Help>
      )}
    </Container>
  )
}

export default Exchange
