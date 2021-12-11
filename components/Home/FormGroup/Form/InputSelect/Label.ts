import styled from "styled-components"
import { mobile } from "@/src/constants"

const Label = styled.label`
  width: 100%;
  font-size: 0.79em;
  font-weight: 400;
  color: var(--gray);

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.867em;
  }
`

export default Label
