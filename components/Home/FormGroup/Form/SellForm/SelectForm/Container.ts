import styled from "styled-components"
import { mobile } from "@/src/constants"
import { Step } from "./Steps"

type ContainerProps = {
  formStep: Step
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 568px;
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${(props) =>
    props.formStep != Step.Exchange ? "34px 25px" : "34px 25px 0 25px"};

  @media only screen and (max-width: ${mobile}px) {
    height: 470px;
    padding: ${(props) =>
      props.formStep != Step.Exchange ? "21px 17px" : "21px 17px 0 17px"};
  }
`

export default Container
