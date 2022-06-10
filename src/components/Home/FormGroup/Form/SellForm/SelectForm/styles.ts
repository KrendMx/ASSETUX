import styled from "styled-components"

import { mobile } from "@/utils/constants"

import NextButton from "../../NextButton"

import { Step } from "./Steps"

type ContainerProps = {
  formStep: Step
  lastSelectorActive?: boolean
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100%;
  height: ${(props) =>
    props.formStep == Step.Exchange
      ? "670px"
      : props.lastSelectorActive
      ? "568px"
      : "490px"};
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${(props) =>
    props.formStep != Step.Exchange ? "34px 25px" : "34px 25px 6px 25px"};

  .input-skeleton {
    line-height: 0;
    display: inline-block;
    width: 100%;

    & > span {
      height: 3.421em;

      @media only screen and (max-width: ${mobile}px) {
        height: 4.334em;
      }
    }
  }

  @media only screen and (max-width: ${mobile}px) {
    height: ${(props) =>
      props.formStep == Step.Exchange
        ? "600px"
        : props.lastSelectorActive
        ? "521px"
        : "445px"};
    padding: ${(props) =>
      props.formStep != Step.Exchange ? "21px 17px" : "21px 17px 6px 17px"};
  }

  @media only screen and (max-width: 370px) {
    height: ${(props) =>
      props.formStep == Step.Exchange
        ? "42em"
        : props.lastSelectorActive
        ? "35em"
        : "30em"};
  }
`

export const ExchangeButtonsContainer = styled.div``

export const ExchangeButton = styled(NextButton)``

export const RefundButton = styled(NextButton)`
  background: var(--white);
  color: var(--blue);
`

export const ExchangeInfoContainer = styled.div`
  margin-top: 16px;

  & > * + * {
    margin-top: 16px;
  }

  @media only screen and (max-width: ${mobile}px) {
    margin-top: 13px;

    & > * + * {
      margin-top: 13px;
    }
  }
`

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
