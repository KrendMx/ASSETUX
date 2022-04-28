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
  allowScrolling?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

function Background({ allowScrolling, children, onClick }: BackgroundProps) {
  return (
    <Container
      onClick={() => onClick && onClick()}
      onWheel={(event) =>
        !allowScrolling && event.cancelable && event.preventDefault()
      }
      onTouchMove={(event) =>
        !allowScrolling && event.cancelable && event.preventDefault()
      }
    >
      {children}
    </Container>
  )
}

export default Background
