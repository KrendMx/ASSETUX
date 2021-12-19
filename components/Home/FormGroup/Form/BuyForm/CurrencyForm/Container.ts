import styled from "styled-components"
import { mobile } from "@/src/constants"
import Step from "./Steps"

type ContainerProps = {
  formStep?: Step
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: ${(props) => (props.formStep == Step.Payment ? "617px" : "456px")};
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (max-width: ${mobile}px) {
    height: ${(props) => (props.formStep == Step.Payment ? "581px" : "425px")};
  }
`

export default Container
