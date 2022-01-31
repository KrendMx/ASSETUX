import styled from "styled-components"
import { mobile } from "@/src/constants"

const ExchangeInfoContainer = styled.div`
  margin-top: 16px;

  & > * + * {
    margin-top: 16px;
  }

  @media only screen and (max-width: ${mobile}px) {
    margin-top: 13px;

    & > * + * {
      margin-top: 13px;
    }
  }
`

export default ExchangeInfoContainer
