import styled from "styled-components"

type ArrowProps = {
  active: boolean
}

const Arrow = styled.button<ArrowProps>`
  display: flex;
  padding: 10px;
  position: absolute;
  right: 11px;
  top: 50%;
  transform: translateY(-50%)
    ${(props) => (props.active ? "rotate(180deg)" : "")};
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1em;
  cursor: pointer;

  @media only screen and (max-width: 370px) {
    right: 5px;
  }
`

export default Arrow
