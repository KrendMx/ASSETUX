import styled from "styled-components"
import { mobile } from "@/src/constants"

type ButtonProps = {
  active?: boolean
}

const Button = styled.button<ButtonProps>`
  flex: 0 0 50%;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? "var(--bgColor)" : "#F5F5F5")};
  color: ${(props) => (props.active ? "var(--green)" : "#6E6E73")};
  font-size: ${(props) => (props.active ? "0.95em" : "0.79em")};
  font-weight: ${(props) => (props.active ? 500 : 400)};
  padding: 16px 0;
  cursor: pointer;

  @media only screen and (max-width: ${mobile}px) {
    font-size: ${(props) => (props.active ? "0.95em" : "0.89em")};
  }
`

export default Button
