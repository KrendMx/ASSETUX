import styled from "styled-components"
import Hideable from "@/shared/Hideable"
import { mobile } from "@/src/constants"

type HideableWithMarginProps = {
  margins?: boolean
}

const HideableWithMargin = styled(Hideable)<HideableWithMarginProps>`
  margin-top: ${(props) => (props.margins ? "16px" : "0px")};

  @media only screen and (max-width: ${mobile}px) {
    margin-top: ${(props) => (props.margins ? "13px" : "0px")};
  }
`

export default HideableWithMargin
