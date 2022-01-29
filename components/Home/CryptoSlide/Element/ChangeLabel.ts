import styled from "styled-components"
import { mobile } from "@/src/constants"

const ChangeLabel = styled.span`
  color: var(--gray);
  font-size: 0.74em;
  font-weight: 400;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.65em;
  }
`

export default ChangeLabel
