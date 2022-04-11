import styled from "styled-components"

import AdaptiveFont from "@/shared/AdaptiveFont"

import { mobile } from "@/src/constants"
import { cardsWidth } from "./constants"

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
`

export const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  & > h3 {
    flex-grow: 1;
  }
`

export const AllLink = styled(AdaptiveFont).attrs({
  mobileFactor: 1.5,
  tabletFactor: 1.2
})`
  color: var(--blue);
  font-weight: 500;
  text-decoration: none;
`

export const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 39px 0;

  @media only screen and (max-width: ${mobile}px) {
    margin: 28px 0 20px;
  }
`

export const Controls = styled.div``

export const ControlButton = styled.button`
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--lightgray);
  color: var(--gray);
  font-size: 16px;
  border-radius: 10px;
  height: 49px;
  padding: 0 15px;
`

export const PageRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;

  @media only screen and (max-width: ${cardsWidth}px) {
    justify-content: center;
  }

  @media only screen and (max-width: ${mobile}px) {
    margin-top: 31px;
  }
`

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;

  & > * + * {
    margin-left: 12px;
  }
`

type PageButtonProps = {
  active?: boolean
  nonClickable?: boolean
}

export const PageButton = styled.button<PageButtonProps>`
  border: none;
  outline: none;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.active ? "var(--blue)" : "var(--lightgray)")};
  border-radius: 7px;
  font-size: 13px;
  color: ${(props) => (props.active ? "#ffffff" : "var(--gray)")};
  cursor: ${(props) => (props.nonClickable ? "arrow" : "pointer")};

  &:disabled {
    opacity: var(--opacity);
  }
`

type ArrowContainerProps = {
  mirror?: boolean
}

export const ArrowContainer = styled.span<ArrowContainerProps>`
  display: flex;
  font-size: 20px;

  transform: rotate(${(props) => (props.mirror ? "180deg" : "0")});
`

type ChangeFieldProps = {
  up?: boolean
}

export const ChangeField = styled.span<ChangeFieldProps>`
  color: ${(props) => (props.up ? "var(--green)" : "var(--red)")};
`

type ActionButtonProps = {
  action: "sell" | "buy"
}

export const ActionButton = styled.button<ActionButtonProps>`
  border: 1px solid #d2d2d7;
  outline: none;
  background: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 1.07em;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 105px;
  height: 49px;

  color: ${(props) => (props.action == "sell" ? "var(--red)" : "var(--green)")};
`
