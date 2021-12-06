import React, { useState, useEffect, useRef } from "react"
import { calculateBasis } from "./helpers"
import Container from "./Container"
import Content from "./Content"
import Element from "./Element"

const preventer = (event: Event) => {
  event.preventDefault()
}

const preventerOpts = {
  passive: false
}

type SliderProps = {
  children?: JSX.Element[] | JSX.Element
  toShow: number
  gap: number
  padding: number
  startOffset?: number
}

function Slider({ children, toShow, gap, padding, startOffset }: SliderProps) {
  const [checkedBasis, setCheckedBasis] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const childrenLength = Array.isArray(children) ? children.length : 1
  const swipeOffset = checkedBasis + gap
  const checkedStartOffset = startOffset ? startOffset : 0

  const next = () => {
    if (currentIndex + toShow < childrenLength) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const previous = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) {
      next()
    } else {
      previous()
    }
  }

  const handleEnter = () => {
    window.addEventListener("wheel", preventer, preventerOpts)
  }

  const handleLeave = () => {
    window.removeEventListener("wheel", preventer)
  }

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const contentWidth = containerRef.current.clientWidth

        setCheckedBasis(
          calculateBasis({
            toShow,
            contentWidth,
            gap,
            padding,
            startOffset: checkedStartOffset
          })
        )
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [containerRef, toShow, gap, padding, checkedStartOffset])

  if (!children) {
    return null
  }

  return (
    <Container
      startOffset={checkedStartOffset}
      padding={padding}
      ref={containerRef}
    >
      <Content offsetX={currentIndex * -swipeOffset} gap={gap}>
        {!Array.isArray(children) ? (
          <Element
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onWheel={handleWheel}
            basis={checkedBasis}
          >
            {children}
          </Element>
        ) : (
          children.map((child, index) => (
            <Element
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              onWheel={handleWheel}
              basis={checkedBasis}
              key={index}
            >
              {child}
            </Element>
          ))
        )}
      </Content>
    </Container>
  )
}

export default Slider
