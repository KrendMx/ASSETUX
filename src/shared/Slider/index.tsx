import React, { useState, useRef, useEffect } from "react"
import Container from "./Container"
import Content from "./Content"
import Element from "./Element"
import { useSwipeable } from "react-swipeable"
import { useAppSelector } from "@/src/redux/hooks"
import { preventerOpts, swipeProps, swipeTimeout, wheelDelta } from "./config"
import type { ResponsiveProps } from "./types"
import type { SwipeDirections } from "react-swipeable"

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
  const [swipedPixels, setSwipedPixels] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const swipeDirection = useRef<SwipeDirections | "none">("none")
  const lastSwipe = useRef<number | null>(null)
  const hovered = useRef(false)
  const responsiveToShow = useRef(toShow)
  const containerRef = useRef<HTMLDivElement>(null)
  const childrenLength = Array.isArray(children) ? children.length : 1
  const isMobile = useAppSelector((state) => state.ui.isMobile)

  const swipeHandlers = useSwipeable({
    onSwipeStart: (event) => {
      swipeDirection.current = event.dir
    },
    onSwiping: (event) => {
      if (swipeDirection.current == "Left") {
        setSwipedPixels(event.deltaX + swipeProps.delta)
      } else if (swipeDirection.current == "Right") {
        setSwipedPixels(event.deltaX - swipeProps.delta)
      }
    },
    onSwiped: () => {
      setSwipedPixels(0)
      swipeDirection.current = "none"
    },
    onSwipedLeft: () => {
      swipe("left")
    },
    onSwipedRight: () => {
      swipe("right")
    },
    ...swipeProps
  })

  useEffect(() => {
    return () => {
      if (hovered.current) {
        handleLeave()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      let checkedToShow = toShow

      if (responsive) {
        for (const props of responsive) {
          if (windowWidth <= props.resolution) {
            checkedToShow = props.toShow
          }
        }
      }

      if (responsiveToShow.current != checkedToShow) {
        setCurrentIndex(0)
      }
      responsiveToShow.current = checkedToShow
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [responsive, toShow])

  const swipe = (direction: "left" | "right") => {
    let canSwipe = false
    if (direction == "left") {
      canSwipe = currentIndex + responsiveToShow.current < childrenLength
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
    if (!isMobile) {
      hovered.current = true
      window.addEventListener("wheel", preventer, preventerOpts)
    }
  }

  const handleLeave = () => {
    if (!isMobile) {
      hovered.current = false
      window.removeEventListener("wheel", preventer)
    }
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
