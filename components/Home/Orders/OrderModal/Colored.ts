import styled, { css } from "styled-components"
import { mobileLayoutForTablet } from "@/src/constants"

type ColoredProps = {
  colorIn: "red" | "green"
  split?: boolean
}

const Colored = styled.span<ColoredProps>`
  color: ${(props) => (props.colorIn == "red" ? "var(--red)" : "var(--green)")};
  text-align: left;
  font-weight: 500;

  ${(props) =>
    props.split &&
    css`
      & > span {
        display: block;
      }
    `}

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    font-size: 1.07em;
    display: block;
    margin-bottom: 0.5em;
  }
`

export default Colored
