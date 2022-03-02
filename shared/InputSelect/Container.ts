import styled from "styled-components"
import { mobile } from "@/src/constants"

type ContainerProps = {
  resetFirstChild: boolean
}

const Container = styled.div<ContainerProps>`
  & > *:not(:last-child) {
    margin-bottom: 16px;
  }

  @media only screen and (max-width: ${mobile}px) {
    & > *:not(:last-child) {
      margin-bottom: 13px;
    }
  }
`

export default Container
