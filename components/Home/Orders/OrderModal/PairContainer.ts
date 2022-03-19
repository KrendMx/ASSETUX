import styled from "styled-components"
import { mobileLayoutForTablet } from "@/src/constants"

const PairContainer = styled.span`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    & > * + * {
      margin-left: 8px;
    }
  }
`

export default PairContainer
