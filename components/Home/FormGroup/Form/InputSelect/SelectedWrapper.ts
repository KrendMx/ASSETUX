import styled from "styled-components"
import { mobile } from "@/src/constants"

type InfoContainerProps = {
  selectable: boolean
}

const SelectedWrapper = styled.button<InfoContainerProps>`
  flex: 0 0 100px;
  cursor: pointer;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  height: 100%;

  @media only screen and (max-width: ${mobile}px) {
    flex-basis: 90px;
  }
  @media only screen and (max-width: 370px) {
    flex-basis: 75px;
  }
`

export default SelectedWrapper
