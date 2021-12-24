import React, { useState, useEffect, useRef } from "react"
import { calculateBasis } from "./helpers"
import Container from "./Container"
import Content from "./Content"
import Element from "./Element"
import { useSwipeable } from "react-swipeable"
import { useAppSelector } from "@/src/redux/hooks"

const swipeTimeout = 1 * 10e1

const preventer = (event: Event) => {
  if (event.cancelable) {
    event.preventDefault()
  }
}

const preventerOpts = {
  passive: false
}

const swipeProps = {
  delta: 50,
  preventDefaultTouchmoveEvent: false,
  trackTouch: true,
  trackMouse: false,
  rotationAngle: 0
}

type SliderProps = {
  children?: JSX.Element[] | JSX.Element
  toShow: number
  gap: number
  horizPadding: number
  vertPadding: number
  startOffset?: number
}

function Slider({
  children,
  toShow,
  gap,
  horizPadding,
  vertPadding,
  startOffset
}: SliderProps) {
  const [swipedPixels, setSwipePixels] = useState(0)
  const [checkedBasis, setCheckedBasis] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastSwipe = useRef<number | null>(null)
  const hovered = useRef(false)
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
      swipe("left")
    },
    onSwipedRight: () => {
      swipe("right")
    },
    ...swipeProps
  })

  const swipe = (direction: "left" | "right") => {
    let canSwipe = false
    if (direction == "left") {
      canSwipe = currentIndex + toShow < childrenLength
    } else {
      canSwipe = currentIndex > 0
    }
    if (canSwipe) {
      const currentDate = Date.now()
      if (
        lastSwipe.current == null ||
        currentDate - lastSwipe.current >= swipeTimeout
      ) {
        lastSwipe.current = currentDate
        const newIndex =
          direction == "left" ? currentIndex + 1 : currentIndex - 1
        setCurrentIndex(newIndex)
      }
    }
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!isMobile && hovered.current && Math.abs(event.deltaY) > 20) {
      if (event.deltaY > 0) {
        swipe("left")
      } else {
        swipe("right")
      }
    }
  }

  const handleEnter = () => {
    hovered.current = true
    window.addEventListener("wheel", preventer, preventerOpts)
  }

  const handleLeave = () => {
    hovered.current = false
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
            padding: horizPadding,
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
  }, [containerRef, toShow, gap, horizPadding, checkedStartOffset])

  if (!children) {
    return null
  }

  return (
    <Container
      startPadding={checkedStartOffset}
      horizPadding={horizPadding}
      vertPadding={vertPadding}
      ref={containerRef}
    >
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onWheel={handleWheel}
        onTouchStart={() => {
          window.addEventListener("touchmove", preventer, preventerOpts)
        }}
        onTouchEnd={() => {
          window.removeEventListener("touchmove", preventer)
        }}
        {...swipeHandlers}
      >
        <Content
          animate={swipedPixels == 0}
          offsetX={currentIndex * -swipeOffset + swipedPixels}
          gap={gap}
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
      </div>
    </Container>
  )
}

export default Slider
