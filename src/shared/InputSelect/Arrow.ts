import styled from "styled-components"

type ArrowProps = {
  active: boolean
}

const Arrow = styled.span<ArrowProps>`
  display: flex;
  padding: 0.526em;
  position: absolute;
  right: 0.5789em;
  top: 50%;
  transform: translateY(-50%)
    ${(props) => (props.active ? "rotate(180deg)" : "")};
  font-size: 1em;
`

export default Arrow
