import styled, { css } from "styled-components"

type ButtonProps = {
  isLoading?: boolean
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  background: #0066cc;
  border-radius: 10px;
  border: none;
  outline: none;
  padding: 0.938em 0;
  letter-spacing: 0.02em;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  min-height: 49px;
  ${(props) =>
    !props.isLoading &&
    css`
      &:disabled {
        opacity: 0.3;
      }
    `}

  &:disabled {
    cursor: default;
  }

  @media only screen and (max-width: 370px) {
    border-radius: 0.625em;
    font-size: 1.08em;
  }
`

export default Button
