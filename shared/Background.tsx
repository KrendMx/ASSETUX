import React, { useEffect } from "react"
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
  scrollToTop?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

function Background({
  allowScrolling,
  scrollToTop,
  children,
  onClick
}: BackgroundProps) {
  useEffect(() => {
    if (!scrollToTop) {
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
