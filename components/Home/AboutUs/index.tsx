import React from "react"
import styled from "styled-components"
import Image from "next/image"
import AdaptiveFont from "@/shared/AdaptiveFont"
import { mobileLaoyutForTablet } from "@/src/constats"

const Container = styled.section`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: ${mobileLaoyutForTablet}px) {
    flex-direction: column;
    align-items: center;
  }
`

const AboutContainer = styled.div`
  flex: 1 1 50%;
  padding-top: 99px;
  display: flex;
  flex-direction: column;
  margin-right: 120px;

  & > h2 {
    margin-bottom: 33px;
  }

  @media only screen and (max-width: 1200px) {
    margin-right: 60px;
  }

  @media only screen and (max-width: ${mobileLaoyutForTablet}px) {
    padding-top: 0;
    margin-right: 0;

    & > h2 {
      margin-bottom: 20px;
    }
  }
`

const TextContainer = styled(AdaptiveFont).attrs({
  mobileFactor: 1.34,
  tabletFactor: 1.2
})`
  p {
    color: #616161;
  }

  p:not(:last-child) {
    margin-bottom: 25px;
  }

  @media only screen and (max-width: ${mobileLaoyutForTablet}px) {
    p:not(:last-child) {
      margin-bottom: 15px;
    }
  }
`

const ImageContainer = styled.div`
  flex: 1 1 50%;
  display: block;
  max-width: 596px;
  max-height: 596px;

  @media only screen and (max-width: ${mobileLaoyutForTablet}px) {
    width: 100%;
  }
`

function AboutUs() {
  return (
    <Container>
      <AboutContainer>
        <h2>About us</h2>
        <TextContainer>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </TextContainer>
      </AboutContainer>
      <ImageContainer>
        <Image
          src="/pablo/pablo_savings.png"
          width={200}
          height={200}
          alt="Pablo Savings"
          layout="responsive"
        />
      </ImageContainer>
    </Container>
  )
}

export default AboutUs
