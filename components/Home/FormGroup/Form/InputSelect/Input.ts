import styled from "styled-components"
import { mobile } from "@/src/constants"

const Input = styled.input`
  width: 100%;
  font-size: 1em;
  font-weight: 500;
  color: var(--black);
  border: none;
  outline: none;

  &:disabled {
    opacity: 1;
    -webkit-text-fill-color: var(--black);
    font-size: 1em;
    font-weight: 500;
    color: var(--black);
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.067em;

    &:disabled {
      font-size: 1.067em;
    }
  }
`

export default Input
