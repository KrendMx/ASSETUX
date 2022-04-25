import styled from "styled-components"

import { mobile } from "@/src/constants"

import Step from "./Steps"

type ContainerProps = {
  formStep?: Step
  lastSelectorActive?: boolean
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100%;
  height: ${(props) =>
    props.formStep == Step.Credentials
      ? "519px"
      : props.lastSelectorActive
      ? "649px"
      : "490px"};
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 34px 25px;

  @media only screen and (max-width: ${mobile}px) {
    height: ${(props) => (props.lastSelectorActive ? "599px" : "445px")};
    padding: 21px 17px;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
