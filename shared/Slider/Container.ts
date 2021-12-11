import styled from "styled-components"

type ContainerProps = {
  horizPadding: number
  vertPadding: number
  startOffset: number
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  overflow: hidden;
  padding: ${(props) => `${props.vertPadding}px ${props.horizPadding}px`};
  padding-left: ${(props) => `${props.horizPadding + props.startOffset}px`};
`

export default Container
