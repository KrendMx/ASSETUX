import React, { useState, useRef } from "react"
import Container from "./Container"
import Content from "./Content"
import Element from "./Element"
import { useSwipeable } from "react-swipeable"
import { useAppSelector } from "@/src/redux/hooks"
import { preventerOpts, swipeProps, swipeTimeout, wheelDelta } from "./config"
import type { ResponsiveProps } from "./types"

const preventer = (event: Event) => {
  if (event.cancelable) {
    event.preventDefault()
  }
}

type SliderProps = {
  children?: JSX.Element[] | JSX.Element
  toShow: number
  gap: number
  horizPadding: number
  vertPadding: number
  responsive?: ResponsiveProps[]
}

function Slider({
  children,
  toShow,
  gap,
  horizPadding,
  vertPadding,
  responsive
}: SliderProps) {
  const [swipedPixels, setSwipePixels] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastSwipe = useRef<number | null>(null)
  const hovered = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const childrenLength = Array.isArray(children) ? children.length : 1
  const isMobile = useAppSelector((state) => state.ui.isMobile)

  const swipeHandlers = useSwipeable({
    onSwiping: (event) => {
      setSwipePixels(event.deltaX)
    },
    onSwiped: () => {
      setSwipePixels(0)
    },
    onSwipedDown: () => {}, // prevent scrolling
    onSwipedUp: () => {}, // prevent scrolling
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
    if (!isMobile && hovered.current && Math.abs(event.deltaY) > wheelDelta) {
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

  if (!children) {
    return null
  }

  return (
    <Container
      horizPadding={horizPadding}
      vertPadding={vertPadding}
      ref={containerRef}
      toShow={toShow}
      gap={gap}
      responsive={responsive}
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
          swipedPixels={swipedPixels}
          currentIndex={currentIndex}
        >
          {!Array.isArray(children) ? (
            <Element>{children}</Element>
          ) : (
            children.map((child, index) => (
              <Element key={index}>{child}</Element>
            ))
          )}
        </Content>
      </div>
    </Container>
  )
}

export default Slider
