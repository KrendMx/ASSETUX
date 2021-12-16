import React from "react"
import styled from "styled-components"
import Button from "./Button"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { swapAction } from "@/src/redux/cryptoSlice"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Skeleton from "react-loading-skeleton"

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

  @media only screen and (max-width: 370px) {
    font-size: 4.5vw;
  }
`

const BuyButton = styled(Button)`
  border-top-right-radius: ${(props) => (props.active ? "10px" : 0)};
  border-top-left-radius: 10px;
`

const SellButton = styled(Button)`
  border-top-left-radius: ${(props) => (props.active ? "10px" : 0)};
  border-top-right-radius: 10px;
`

const SkeletonContainer = styled.span`
  width: 75%;
`

function Buttons() {
  const dispatch = useAppDispatch()
  const appLoaded = useAppSelector((state) => state.ui.appLoaded)
  const isMobile = useAppSelector((state) => state.ui.isMobile)
  const action = useAppSelector((state) => state.crypto.action)

  const isBuy = action == "BUY"

  return (
    <Container>
      <BuyButton active={isBuy} onClick={() => dispatch(swapAction("BUY"))}>
        {appLoaded ? (
          isMobile ? (
            "Buy Crypto"
          ) : (
            "Buy Cryptocurrencies"
          )
        ) : (
          <SkeletonContainer>
            <Skeleton />
          </SkeletonContainer>
        )}
      </BuyButton>
      <SellButton active={!isBuy} onClick={() => dispatch(swapAction("SELL"))}>
        {appLoaded ? (
          isMobile ? (
            "Sell Crypto"
          ) : (
            "Sell Cryptocurrencies"
          )
        ) : (
          <SkeletonContainer>
            <Skeleton />
          </SkeletonContainer>
        )}
      </SellButton>
    </Container>
  )
}

export default Buttons
