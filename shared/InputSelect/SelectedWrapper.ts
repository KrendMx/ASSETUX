import styled from "styled-components"
import { mobile } from "@/src/constants"

type InfoContainerProps = {
  selectable: boolean
}

const SelectedWrapper = styled.button<InfoContainerProps>`
  flex: 0 0 ${(props) => (!props.selectable ? "3.684em" : "5.263em")};
  cursor: ${(props) => (props.selectable ? "cursor" : "default")};
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1em;

  @media only screen and (min-width: 371px) and (max-width: ${mobile}px) {
    flex: 0 0 ${(props) => (!props.selectable ? "3.684em" : "5.6em")};
  }
`

export default SelectedWrapper
