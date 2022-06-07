import styled, { css } from "styled-components"
import Hideable from "@/shared/Hideable"

type HideableWithMarginProps = {
  margins?: boolean | string
  space?: string
}

const HideableWithMargin = styled(Hideable)<HideableWithMarginProps>`
  margin-top: ${(props) =>
    typeof props.margins == "string"
      ? props.margins
      : props.margins
      ? "0.842em"
      : "0px"};

  ${(props) =>
    props.space &&
    css`
      & > * + * {
        margin-top: ${props.space};
      }
    `}
`

export default HideableWithMargin
