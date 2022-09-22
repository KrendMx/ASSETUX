import React, { useEffect } from 'react'
import styled from 'styled-components'

type ContainerProps = {
  absolute?: boolean
}

const Container = styled.div<ContainerProps>`
  position: ${(props) => (props.absolute ? 'absolute' : 'fixed')};
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
  absolute?: boolean
}

const Background = ({
  allowScrolling,
  scrollToTop,
  children,
  absolute
}: BackgroundProps) => {
  useEffect(() => {
    if (!scrollToTop) {
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container
      absolute={absolute}
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
