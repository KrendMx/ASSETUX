import styled from "styled-components"
import { mobile } from "@/src/utils/constants"

const Input = styled.input`
  width: 100%;
  font-size: 1em;
  font-weight: 500;
  color: var(--black);
  border: none;
  background-color: transparent;
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
    -webkit-text-fill-color: var(--black);
    -webkit-box-shadow: 0 0 0px 1000px var(--white) inset;
    box-shadow: 0 0 0px 1000px var(--white) inset;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.067em;

    &:disabled {
      font-size: 1.067em;
    }
  }
`

export default Input
