import styled from "styled-components"
import Hideable from "@/shared/Hideable"

type HideableWithMarginProps = {
  margins?: boolean
}

const HideableWithMargin = styled(Hideable)<HideableWithMarginProps>`
  margin-top: ${(props) => (props.margins ? "0.842em" : "0px")};
`

export default HideableWithMargin
