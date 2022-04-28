import React from "react"
import styled from "styled-components"

type ContainerProps = {
  offsetY: number
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  left: 0;
  top: ${(props) => `calc(100% + ${props.offsetY}px)`};
  border-radius: 10px;
  z-index: 10;
  font-size: 0.7rem;
  font-weight: 500;
  color: #ffffff;
  padding: 0.978em 1.654em;
  backdrop-filter: blur(4px);
`

type HelpProps = {
  offsetY?: number
  children: string
}

function Help({ offsetY = 10, children }: HelpProps) {
  return <Container offsetY={offsetY}>{children}</Container>
}

export default Help
