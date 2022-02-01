import styled from "styled-components"
import { mobile } from "@/src/constants"
import Step from "./Steps"

type ContainerProps = {
  formStep?: Step
  lastSelectorActive?: boolean
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: ${(props) => (props.lastSelectorActive ? "568px" : "490px")};
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 34px 25px;

  @media only screen and (max-width: ${mobile}px) {
    height: ${(props) => (props.lastSelectorActive ? "521px" : "445px")};
    padding: 21px 17px;
  }
`

export default Container
