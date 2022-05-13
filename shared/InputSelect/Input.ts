import styled from "styled-components"
import { mobile } from "@/src/constants"

const Input = styled.input`
  width: 100%;
  font-size: 1em;
  font-weight: 500;
  color: var(--black);
  border: none;
  background-color: var(--bgColor);
  outline: none;

  &:disabled {
    opacity: 1;
    -webkit-text-fill-color: var(--black);
    font-size: 1em;
    font-weight: 500;
    color: var(--black);
  }

  &::placeholder {
    color: var(--black);
    opacity: 0.7;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.067em;

    &:disabled {
      font-size: 1.067em;
    }
  }
`

export default Input
