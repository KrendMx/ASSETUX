import styled from "styled-components"
import { mobile } from "@/src/constants"

const SymbolIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.42em;

  & > * + * {
    margin-left: 15px;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1em;
  }
`

export default SymbolIconContainer