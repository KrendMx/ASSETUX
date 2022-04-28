import styled from "styled-components"

import AdaptiveFont from "@/shared/AdaptiveFont"

import { mobile } from "@/src/constants"

type ButtonProps = {
  active?: boolean
}

const Button = styled.button<ButtonProps>`
  flex: 0 0 50%;
  height: 50px;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? "var(--bgColor)" : "#F5F5F5")};
  font-size: ${(props) => (props.active ? "0.95em" : "0.79em")};
  font-weight: ${(props) => (props.active ? 500 : 400)};
  cursor: pointer;

  @media only screen and (max-width: ${mobile}px) {
    font-size: ${(props) => (props.active ? "0.95em" : "0.89em")};
    height: ${(props) => (props.active ? "3.1191em" : "3.328894em")};
  }
`

export const BuyButton = styled(Button)`
  border-top-right-radius: ${(props) => (props.active ? "10px" : 0)};
  border-top-left-radius: 10px;
  color: ${(props) => (props.active ? "var(--green)" : "#6E6E73")};

  @media only screen and (max-width: 370px) {
    border-top-right-radius: ${(props) => (props.active ? "0.632em" : 0)};
    border-top-left-radius: ${(props) =>
      props.active ? "0.632em" : "0.6748em"};
  }
`

export const SellButton = styled(Button)`
  border-top-left-radius: ${(props) => (props.active ? "10px" : 0)};
  border-top-right-radius: 10px;
  color: ${(props) => (props.active ? "var(--red)" : "#6E6E73")};

  @media only screen and (max-width: 370px) {
    border-top-left-radius: ${(props) => (props.active ? "0.632em" : 0)};
    border-top-right-radius: ${(props) =>
      props.active ? "0.632em" : "0.6748em"};
  }
`

export const Container = styled(AdaptiveFont).attrs({
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

export const SkeletonContainer = styled.span`
  width: 75%;
`
