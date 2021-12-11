import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import Slider from "@/shared/Slider"
import Element from "./Element"
import useSliderConfig from "../sliderConfig"
import { mobile } from "@/src/constants"

const desktopPaddings = 125

const Container = styled.section`
  display: block;
  width: 100%;
  height: 245px;

  // override page padding
  padding: 0 !important;
`

const CenteredRow = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: var(--max-width);
  height: 0;
  padding: 0 var(--paddings);
`

function CryptoSlide() {
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
      <CenteredRow ref={rowRef} />
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
        <Element />
      </Slider>
    </Container>
  )
}

export default CryptoSlide
