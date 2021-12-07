import React, { useState, useEffect, useRef } from "react"
import { calculateBasis } from "./helpers"
import Container from "./Container"
import Content from "./Content"
import Element from "./Element"
import { useSwipeable } from "react-swipeable"
import { useAppSelector } from "@/src/redux/hooks"

const preventer = (event: Event) => {
  event.preventDefault()
}

const preventerOpts = {
  passive: false
}

const swipeProps = {
  delta: 10,
  preventDefaultTouchmoveEvent: false,
  trackTouch: true,
  trackMouse: false,
  rotationAngle: 0
}

type SliderProps = {
  children?: JSX.Element[] | JSX.Element
  toShow: number
  gap: number
  padding: number
  startOffset?: number
}

function Slider({ children, toShow, gap, padding, startOffset }: SliderProps) {
  const [swipedPixels, setSwipePixels] = useState(0)
  const [checkedBasis, setCheckedBasis] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const childrenLength = Array.isArray(children) ? children.length : 1
  const swipeOffset = checkedBasis + gap
  const checkedStartOffset = startOffset ? startOffset : 0
  const isMobile = useAppSelector((state) => state.ui.isMobile)

  const swipeHandlers = useSwipeable({
    onSwiping: (event) => {
      setSwipePixels(event.deltaX)
    },
    onSwiped: () => {
      setSwipePixels(0)
    },
    onSwipedLeft: () => {
      next()
    },
    onSwipedRight: () => {
      previous()
    },
    ...swipeProps
  })

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
    if (!isMobile) {
      if (event.deltaY > 0) {
        next()
      } else {
        previous()
      }
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
      <Content
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onWheel={handleWheel}
        animate={swipedPixels == 0}
        offsetX={currentIndex * -swipeOffset + swipedPixels}
        gap={gap}
        {...swipeHandlers}
      >
        {!Array.isArray(children) ? (
          <Element basis={checkedBasis}>{children}</Element>
        ) : (
          children.map((child, index) => (
            <Element basis={checkedBasis} key={index}>
              {child}
            </Element>
          ))
        )}
      </Content>
    </Container>
  )
}

export default Slider
