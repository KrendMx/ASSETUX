import React from "react"
import styled from "styled-components"
import Element from "./Element"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Slider from "@/shared/Slider"

const Container = styled.section`
  display: flex;
  flex-direction: column;

  // override page padding
  /* padding: 0 !important; */
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 47px;
  /* padding: 0 var(--paddings); */
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
          gap={19}
          padding={50}
          // basis={383}
          toShow={3}
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
