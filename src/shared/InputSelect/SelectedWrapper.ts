import styled from "styled-components"
import { mobile } from "@/utils/constants"

type InfoContainerProps = {
  selectable: boolean
}

const SelectedWrapper = styled.button.attrs<InfoContainerProps>((props) => ({
  type: props.selectable ? "button" : undefined
}))<InfoContainerProps>`
  flex: 0 0 ${(props) => (!props.selectable ? "3.684em" : "5.263em")};
  background: transparent;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1em;
  cursor: ${(props) => (props.selectable ? "pointer" : "default")};

  @media only screen and (min-width: 371px) and (max-width: ${mobile}px) {
    flex: 0 0 ${(props) => (!props.selectable ? "3.684em" : "5.6em")};
  }
`

export default SelectedWrapper
