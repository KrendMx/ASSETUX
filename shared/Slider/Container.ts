import styled from "styled-components"

type ContainerProps = {
  padding: number
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  overflow: hidden;
  padding: ${(props) => `${props.padding}px`};
`

export default Container
