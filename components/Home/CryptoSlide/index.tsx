import React, { useRef, useState, useEffect, useMemo } from "react"
import styled from "styled-components"
import Slider from "@/shared/Slider"
import Element from "./Element"
import { useAppSelector } from "@/src/redux/hooks"
import useSliderConfig from "../sliderConfig"
import type { Token } from "@/src/BackendClient/types"

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

const mapTokens = (tokens: Token[]) => {
  return tokens.map((token) => (
    <Element key={token.id} icon={token.logo_uri} symbol={token.symbol} />
  ))
}

const getSkeletons = () => {
  const skeletons = []
  for (let i = 0; i < 6; i++) {
    skeletons.push(<Element key={i} />)
  }
  return skeletons
}

function CryptoSlide() {
  const availableTokens = useAppSelector(
    (state) => state.crypto.availableTokens
  )
  const [desktopOffset, setDesktopOffset] = useState(0)
  const sliderConfig = useSliderConfig({ desktopOffset })
  const rowRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const mappedTokens = useMemo(
    () => availableTokens && mapTokens(availableTokens),
    [availableTokens]
  )

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
        {mappedTokens ? mappedTokens : getSkeletons()}
      </Slider>
    </Container>
  )
}

export default CryptoSlide
