import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import Element from "./Element"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Slider from "@/shared/Slider"
import useSliderConfig from "../sliderConfig"

const desktopPaddings = 125

const Container = styled.section`
  display: flex;
  flex-direction: column;

  // override page padding
  padding: 0 !important;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 28px;
  padding: 0 var(--paddings);
`

const MoreLink = styled(AdaptiveFont).attrs({
  mobileFactor: 1.5,
  tabletFactor: 1.2
})`
  color: var(--blue);
  font-weight: 500;
  text-decoration: none;
`

const SliderContainer = styled.div`
  display: block;
  width: 100%;
`

function NewsRoom() {
  const [desktopOffset, setDesktopOffset] = useState(0)
  const sliderConfig = useSliderConfig({ desktopOffset })
  const rowRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (rowRef.current && containerRef.current) {
        const windowWidth = containerRef.current.clientWidth
        const freeSpace =
          windowWidth - (rowRef.current.clientWidth - desktopPaddings * 2)
        setDesktopOffset(freeSpace / 2)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [rowRef, containerRef])

  return (
    <Container ref={containerRef}>
      <Row ref={rowRef}>
        <h3>News Room</h3>
        <MoreLink as="a" href="#">
          Show more
        </MoreLink>
      </Row>
      <SliderContainer>
        <Slider {...sliderConfig}>
          <Element />
          <Element />
          <Element />
          <Element />
          <Element />
          <Element />
          <Element />
          <Element />
          <Element />
          <Element />
        </Slider>
      </SliderContainer>
    </Container>
  )
}

export default NewsRoom
