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
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.065em;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4.3vw;
  }
`

export default NextButton
