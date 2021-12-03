import styled from "styled-components"

type ColoredSpanProps = {
  color: "green" | "red"
}

const ColoredSpan = styled.span<ColoredSpanProps>`
  color: ${(props) => (props.color == "green" ? "var(--green)" : "var(--red)")};
`

export default ColoredSpan
