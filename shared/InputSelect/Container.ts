import styled from "styled-components"

type ContainerProps = {
  resetFirstChild: boolean
}

const Container = styled.div<ContainerProps>`
  & > *:not(:last-child) {
    margin-bottom: 0.842em;
  }
`

export default Container
