import styled from "styled-components"
import { mobile } from "@/lib/data/constants"

const Bold = styled.span`
  font-size: 1em;
  font-weight: 500;
  color: var(--black);

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.067em;
  }
`

export default Bold
