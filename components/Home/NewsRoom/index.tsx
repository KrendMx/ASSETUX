import React from "react"
import styled from "styled-components"
import Element from "./Element"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Slider from "@/shared/Slider"
import useSliderConfig from "../sliderConfig"

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
  const sliderConfig = useSliderConfig()

  return (
    <Container>
      <Row>
        <h2>News Room</h2>
        <MoreLink as="a" href="#">
          Show more
        </MoreLink>
      </Row>
      <SliderContainer>
        <Slider padding={5} {...sliderConfig}>
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
