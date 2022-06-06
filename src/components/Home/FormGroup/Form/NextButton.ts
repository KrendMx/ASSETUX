import styled from "styled-components"
import { mobile } from "@/src/utils/constants"

type NextButtonProps = {
  isLoading?: boolean
}

const NextButton = styled.button<NextButtonProps>`
  width: 100%;
  font-weight: 500;
  font-size: 0.85em;
  border: none;
  outline: none;
  color: #ffffff;
  background-color: ${(props) =>
    props.isLoading ? "transparent" : "var(--blue)"};
  border-radius: 0.619em;
  cursor: pointer;
  height: 3.035em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.065em;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4.3vw;
  }
`

export default NextButton
