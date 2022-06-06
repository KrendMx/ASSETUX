import styled from "styled-components"

type ContainerProps = {
  resetFirstChild: boolean
}

const Container = styled.div<ContainerProps>`
  font-size: 1rem;

  & > *:not(:last-child) {
    margin-bottom: 0.842em;
  }

  @media only screen and (max-width: 370px) {
    font-size: 4vw;
  }
`

export default Container
