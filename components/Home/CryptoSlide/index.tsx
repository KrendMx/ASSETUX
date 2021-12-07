import React from "react"
import styled from "styled-components"
import Slider from "@/shared/Slider"
import Element from "./Element"
import useSliderConfig from "../sliderConfig"
import { mobile } from "@/src/constants"

const Container = styled.section`
  display: block;
  width: 100%;
  height: 245px;
  // override page padding

  padding: 0 !important;

  @media only screen and (max-width: ${mobile}px) {
    margin: -50px 0;
  }
`

function CryptoSlide() {
  const sliderConfig = useSliderConfig()

  return (
    <Container>
      <Slider padding={5} {...sliderConfig}>
        <Element />
        <Element />
        <Element />
        <Element />
      </Slider>
    </Container>
  )
}

export default CryptoSlide
