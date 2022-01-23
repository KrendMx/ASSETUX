import React, { useState } from "react"
import styled from "styled-components"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Image from "next/image"
import { selectShowSkeleton } from "@/src/redux/uiSlice"
import { useAppSelector } from "@/src/redux/hooks"
import { mobile, optimizeRemoteImages, allowSkeletons } from "@/src/constants"
import Skeleton from "react-loading-skeleton"

type ContainerProps = {
  active: boolean
}

const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1,
  tabletFactor: 1.25
})<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: ${(props) => (props.active ? "245px" : "177px")};
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  background-color: var(--bgColor);
  transition: height 0.2s linear;
  padding: 27px 29px;

  &:not(:last-child) {
    margin-right: 21px;
  }

  @media only screen and (max-width: ${mobile}px) {
    height: 199px;
    padding: 15px 14px;
    font-size: 20px;
  }

  @media only screen and (max-width: 375px) {
    font-size: 1.8em;
  }
`

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #373737;
  font-weight: 500;
  font-size: 1em;
`

const SymbolIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.42em;

  & > * + * {
    margin-left: 15px;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1em;
  }
`

type IconContainerProps = {
  isLoading: boolean
}

const IconContainer = styled.div<IconContainerProps>`
  position: relative;
  width: 42px;
  height: 42px;
  padding: 9px;
  border-radius: 8px;
  background-color: var(--bgColor);
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.12);

  & img {
    opacity: ${(props) => (props.isLoading ? 0 : 1)};
  }
`

type ButtonRowProps = {
  active: boolean
}

const ButtonRow = styled.div<ButtonRowProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  opacity: ${(props) => (props.active ? 1 : 0)};

  & > * + * {
    margin-left: 11px;
  }

  @media only screen and (max-width: ${mobile}px) {
    opacity: 1;
  }
`

const Button = styled.button`
  flex: 1 1 auto;
  display: flex;
  height: 49px;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 1px solid #d2d2d7;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.843em;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.79em;
  }
`

const BuyButton = styled(Button)`
  color: var(--green);
`

const SellButton = styled(Button)`
  color: var(--red);
`

type ElementProps = {
  icon?: string
  symbol?: string
  onBuy?: () => void
  onSell?: () => void
}

function Element({ icon, symbol, onBuy, onSell }: ElementProps) {
  const appLoaded = useAppSelector((state) => state.ui.appLoaded)
  const [active, setActive] = useState(false)

  const isLoading = allowSkeletons && (!appLoaded || !icon || !symbol)

  return (
    <Container
      active={active}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <InfoRow>
        <SymbolIconContainer>
          <IconContainer isLoading={isLoading}>
            {icon && (
              <Image
                src={icon}
                width={42}
                height={42}
                layout="responsive"
                unoptimized={!optimizeRemoteImages}
                alt="Icon"
              />
            )}
          </IconContainer>
          {!isLoading && <span>{symbol}</span>}
          {isLoading && <Skeleton width={80} />}
        </SymbolIconContainer>
        {!isLoading && <span>490$</span>}
        {isLoading && <Skeleton width={75} />}
      </InfoRow>
      <ButtonRow active={active}>
        <BuyButton onClick={() => !isLoading && onBuy && onBuy()}>
          {!isLoading ? `Buy ${symbol}` : <Skeleton width={90} />}
        </BuyButton>
        <SellButton onClick={() => !isLoading && onSell && onSell()}>
          {!isLoading ? `Sell ${symbol}` : <Skeleton width={90} />}
        </SellButton>
      </ButtonRow>
    </Container>
  )
}

export default Element
