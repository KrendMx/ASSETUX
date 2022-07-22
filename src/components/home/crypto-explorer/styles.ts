import styled from "styled-components"

import AdaptiveFont from "@/components/common/adaptive-font"

import { mobile, cardsWidth } from "@/lib/data/constants"

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;

  & > *:nth-last-child(2) {
    margin-bottom: 50px;
  }

  @media only screen and (max-width: ${mobile}px) {
    & > *:nth-last-child(2) {
      margin-bottom: 31px;
    }
  }
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

export const ControlRowContainer = styled.div`
  margin: 39px 0;

  @media only screen and (max-width: ${mobile}px) {
    margin: 28px 0 20px;
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

  @media only screen and (max-width: ${cardsWidth}px) {
    width: 100%;
    font-size: 16px;
  }
`
