import styled from "styled-components"

type ArrowProps = {
  active: boolean
}

const Arrow = styled.button<ArrowProps>`
  display: flex;
  position: absolute;
  right: 21px;
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
