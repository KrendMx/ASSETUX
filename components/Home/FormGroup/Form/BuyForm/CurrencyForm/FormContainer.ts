import styled from "styled-components"
import { mobile } from "@/src/constants"

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & > *:first-child {
    margin-bottom: 16px;
  }

  @media only screen and (max-width: ${mobile}px) {
    & > *:first-child {
      margin-bottom: 13px;
    }
  }
`

export default FormContainer
