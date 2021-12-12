import styled from "styled-components"

const PopupRow = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: var(--black);
  padding: 15px 20px;
  text-decoration: none;
  background: transparent;
  cursor: pointer;
  border: none;
  outline: none;

  & > *:not(:last-child) {
    margin-right: 15px;
  }
`

export default PopupRow
