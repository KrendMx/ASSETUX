import React from "react"
import styled from "styled-components"
import Button from "./Button"
import { selectShowSkeleton } from "@/src/redux/uiSlice"
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
  color: ${(props) => (props.active ? "var(--green)" : "#6E6E73")};
`

const SellButton = styled(Button)`
  border-top-left-radius: ${(props) => (props.active ? "10px" : 0)};
  border-top-right-radius: 10px;
  color: ${(props) => (props.active ? "var(--red)" : "#6E6E73")};
`

const SkeletonContainer = styled.span`
  width: 75%;
`

function Buttons() {
  const dispatch = useAppDispatch()
  const showSkeleton = useAppSelector(selectShowSkeleton)
  const isMobile = useAppSelector((state) => state.ui.isMobile)
  const action = useAppSelector((state) => state.crypto.action)

  const isBuy = action == "BUY"

  return (
    <Container>
      <BuyButton
        active={isBuy}
        onClick={() => !showSkeleton && dispatch(swapAction("BUY"))}
      >
        {!showSkeleton ? (
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
      <SellButton
        active={!isBuy}
        onClick={() => !showSkeleton && dispatch(swapAction("SELL"))}
      >
        {!showSkeleton ? (
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
