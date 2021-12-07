import styled from "styled-components"

const Element = styled.div`
  width: 100%;
  height: 177px;
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  background-color: var(--bgColor);
  transition: height .2s linear;

  &:hover {
    height: 245px;
  }

  &:not(:last-child) {
    margin-right: 21px;
  }
`

export default Element
