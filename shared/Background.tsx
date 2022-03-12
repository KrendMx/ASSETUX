import React from "react"
import styled from "styled-components"

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 100%;
  z-index: 99999;
`

type BackgroundProps = {
  children: React.ReactNode
}

function Background({ children }: BackgroundProps) {
  return (
    <Container
      onWheel={(event) => event.cancelable && event.preventDefault()}
      onTouchMove={(event) => event.cancelable && event.preventDefault()}
    >
      {children}
    </Container>
  )
}

export default Background
