import styled from "styled-components"
import { mobile } from "@/src/constants"

const NextButton = styled.button`
  width: 100%;
  font-weight: 500;
  font-size: 0.85em;
  border: none;
  outline: none;
  color: #ffffff;
  background-color: var(--blue);
  border-radius: 10px;
  cursor: pointer;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.065em;
  }
`

export default NextButton
