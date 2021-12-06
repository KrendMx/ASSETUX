import React from "react"
import styled from "styled-components"
import Element from "./Element"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Slider from "@/shared/Slider"
import { useAppSelector } from "@/src/redux/hooks"

const Container = styled.section`
  display: flex;
  flex-direction: column;

  // override page padding
  padding: 0 !important;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 47px;
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
  const isTablet = useAppSelector((state) => state.ui.isTablet)
  const isMobile = useAppSelector((state) => state.ui.isMobile)

  let slidesToShow = 3
  if (isTablet) {
    slidesToShow = 2
  } else if (isMobile) {
    slidesToShow = 1
  }

  let gap = 19
  if (isMobile) {
    gap = 15
  }

  let startOffset = 125
  if (isMobile) {
    startOffset = 38
  } else if (isTablet) {
    startOffset = 18
  }

  return (
    <Container>
      <Row>
        <h2>News Room</h2>
        <MoreLink as="a" href="#">
          Show more
        </MoreLink>
      </Row>
      <SliderContainer>
        <Slider
          startOffset={startOffset}
          gap={gap}
          padding={5}
          toShow={slidesToShow}
        >
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
