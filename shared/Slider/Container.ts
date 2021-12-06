import styled from "styled-components"

type ContainerProps = {
  padding: number
  startOffset: number
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  overflow: hidden;
  padding: ${(props) => `${props.padding}px`};
  padding-left: ${(props) => `${props.padding + props.startOffset}px`};
`

export default Container
