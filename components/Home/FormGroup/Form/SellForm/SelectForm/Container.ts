import styled from "styled-components"
import { mobile } from "@/src/constants"
import { Step } from "./Steps"

type ContainerProps = {
  formStep: Step
  lastSelectorActive?: boolean
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: ${(props) =>
    props.formStep == Step.Exchange
      ? "550px"
      : props.lastSelectorActive
      ? "568px"
      : "490px"};
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${(props) =>
    props.formStep != Step.Exchange ? "34px 25px" : "34px 25px 6px 25px"};

  @media only screen and (max-width: ${mobile}px) {
    height: ${(props) =>
      props.formStep == Step.Exchange
        ? "480px"
        : props.lastSelectorActive
        ? "521px"
        : "445px"};
    padding: ${(props) =>
      props.formStep != Step.Exchange ? "21px 17px" : "21px 17px 6px 17px"};
  }
`

export default Container
