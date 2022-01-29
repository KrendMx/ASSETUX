import styled, { keyframes, css } from "styled-components"
import { mobileLayoutForTablet } from "@/src/constants"

const delayedShow = keyframes`
  to {
    visibility: visible;
  }
`

type ButtonRowProps = {
  active: boolean
}

const ButtonRow = styled.div<ButtonRowProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  visibility: hidden;

  ${(props) =>
    props.active &&
    css`
      animation: ${delayedShow} 0s 0.2s forwards;
    `}

  & > * + * {
    margin-left: 11px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    visibility: visible;
  }
`

export default ButtonRow
