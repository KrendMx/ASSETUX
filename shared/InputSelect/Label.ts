import styled from "styled-components"
import { mobile } from "@/src/constants"

type LabelProps = {
  error?: boolean
}

const Label = styled.label<LabelProps>`
  // width: 100%;
  font-size: 0.79rem;
  font-weight: 400;
  color: ${(props) => (props.error ? "var(--red)" : "var(--gray)")};

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.867em;
  }
`

export default Label
