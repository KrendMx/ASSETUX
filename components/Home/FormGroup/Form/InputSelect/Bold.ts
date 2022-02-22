import styled from "styled-components"
import { mobile } from "@/src/constants"

const Bold = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: var(--black);

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.067rem;
  }
`

export default Bold
