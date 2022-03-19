import styled from "styled-components"

const Close = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 15px;
  top: 15px;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;

  & > span:first-child {
    transform: rotate(-135deg);
  }

  & > span:last-child {
    transform: rotate(-45deg);
  }
`

export default Close
