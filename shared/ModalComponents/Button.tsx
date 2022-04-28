import styled from "styled-components"

type ButtonProps = {
  main?: boolean
}

const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: ${(props) => (props.main ? "none" : "1px solid #D2D2D7")};
  outline: none;
  background-color: ${(props) => (!props.main ? "transparent" : "var(--blue)")};
  font-weight: 400;
  font-size: 1.0665em;
  width: 100%;
  height: 2.418em;
  border-radius: 10px;
  color: ${(props) => (props.main ? "#ffffff" : "var(--black)")};
`

export default Button
