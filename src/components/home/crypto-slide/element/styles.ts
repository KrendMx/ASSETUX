import styled, { keyframes, css } from "styled-components"

import { mobile, mobileLayoutForTablet } from "@/lib/data/constants"

import AdaptiveFont from "@/components/common/adaptive-font"

export const Button = styled.button`
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
  background: var(--white);

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.79em;
  }
`

export const BuyButton = styled(Button)`
  color: var(--green);
`

export const SellButton = styled(Button)`
  color: var(--red);
`

const delayedShow = keyframes`
  to {
    visibility: visible;
  }
`

type ButtonRowProps = {
  active: boolean
}

export const ButtonRow = styled.div<ButtonRowProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  visibility: hidden;

  ${(props) =>
    props.active &&
    css`
      animation: ${delayedShow} 0s 0.2s forwards;
    `}

  & > * + * {
    margin-left: 11px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    visibility: visible;
  }
`

export const ChangeContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 4px;
  }
`

type ChangeInfoProps = {
  up?: boolean
}

export const ChangeInfo = styled.span<ChangeInfoProps>`
  color: ${(props) => (props.up ? "var(--green)" : "var(--red)")};
  font-size: 1em;
  font-weight: 500;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.79em;
  }
`

export const ChangeLabel = styled.span`
  color: var(--gray);
  font-size: 0.74em;
  font-weight: 400;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.65em;
  }
`

type ContainerProps = {
  active: boolean
}

export const Container = styled(AdaptiveFont).attrs({
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
  overflow: hidden;

  &:not(:last-child) {
    margin-right: 21px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    height: 199px;
    padding: 15px 14px;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 375px) {
    font-size: 1.8em;
  }
`

export const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 30px;

  @media only screen and (max-width: 1230px) {
    padding-top: 34px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    padding-top: 20px;
  }
`

type IconContainerProps = {
  isLoading: boolean
}

export const IconContainer = styled.div<IconContainerProps>`
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

export const InfoContainer = styled.div``

export const SymbolIconContainer = styled.div`
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

export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #373737;
  font-weight: 500;
  font-size: 1em;
`
