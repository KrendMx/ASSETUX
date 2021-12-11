import styled from "styled-components"

type ColoredSpanProps = {
  colorIn: "green" | "red"
}

const ColoredSpan = styled.span<ColoredSpanProps>`
  color: ${(props) => (props.colorIn == "green" ? "var(--green)" : "var(--red)")};
`

export default ColoredSpan
