import styled from "styled-components"
import { mobile } from "@/src/constants"

type InfoContainerProps = {
  selectable: boolean
}

const SelectedWrapper = styled.button<InfoContainerProps>`
  flex: 0 0 ${(props) => (!props.selectable ? "70px" : "100px")};
  cursor: ${(props) => (props.selectable ? "cursor" : "default")};
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  height: 100%;

  @media only screen and (max-width: ${mobile}px) {
    flex-basis: ${(props) => (!props.selectable ? "60px" : "90px")};
  }
  @media only screen and (max-width: 370px) {
    flex-basis: ${(props) => (!props.selectable ? "50px" : "75px")};
  }
`

export default SelectedWrapper
