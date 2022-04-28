import styled from "styled-components"

type ArrowProps = {
  active: boolean
}

const Arrow = styled.button<ArrowProps>`
  display: flex;
  padding: 0.526em;
  position: absolute;
  right: 0.5789em;
  top: 50%;
  transform: translateY(-50%)
    ${(props) => (props.active ? "rotate(180deg)" : "")};
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1em;
  cursor: pointer;
`

export default Arrow
