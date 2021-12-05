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
  children: JSX.Element[]
  basis?: number
  toShow?: number
  gap: number
  padding: number
}

function Slider({ children, basis, toShow, gap, padding }: SliderProps) {
  const [checkedBasis, setCheckedBasis] = useState(0)
  const [containerOffset, setContainerOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    setContainerOffset(containerOffset - event.deltaY)
  }

  const handleEnter = () => {
    window.addEventListener("wheel", preventer, preventerOpts)
  }

  const handleLeave = () => {
    window.removeEventListener("wheel", preventer)
  }

  useEffect(() => {
    if (containerRef.current) {
      const contentWidth = containerRef.current.clientWidth
      setCheckedBasis(
        calculateBasis({ toShow, basis, contentWidth, gap, padding })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef])

  return (
    <Container padding={padding} ref={containerRef}>
      <Content offsetX={containerOffset} gap={gap}>
        {children &&
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
          ))}
      </Content>
    </Container>
  )
}

export default Slider
