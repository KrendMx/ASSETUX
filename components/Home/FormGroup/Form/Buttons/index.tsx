import React from "react"
import styled from "styled-components"
import Button from "./Button"
import { useAppSelector } from "@/src/redux/hooks"
import AdaptiveFont from "@/shared/AdaptiveFont"

const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1.125,
  tabletFactor: 1
})`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  background-color: transparent;
  background-color: #f5f5f5;
`

const BuyButton = styled(Button)`
  border-top-right-radius: ${(props) => (props.active ? "10px" : 0)};
  border-top-left-radius: 10px;
`

const SellButton = styled(Button)`
  border-top-left-radius: ${(props) => (props.active ? "10px" : 0)};
  border-top-right-radius: 10px;
`

type ButtonsProps = {
  buyButtonActive: boolean
  setBuyButtonActive: (active: boolean) => void
}

function Buttons({ buyButtonActive, setBuyButtonActive }: ButtonsProps) {
  const isMobile = useAppSelector((state) => state.ui.isMobile)

  return (
    <Container>
      <BuyButton
        active={buyButtonActive}
        onClick={() => setBuyButtonActive(true)}
      >
        {isMobile ? "Buy Crypto" : "Buy Cryptocurrencies"}
      </BuyButton>
      <SellButton
        active={!buyButtonActive}
        onClick={() => setBuyButtonActive(false)}
      >
        {isMobile ? "Sell Crypto" : "Sell Cryptocurrencies"}
      </SellButton>
    </Container>
  )
}

export default Buttons
