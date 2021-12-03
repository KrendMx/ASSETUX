import React from "react"
import styled from "styled-components"
import Image from "next/image"

const Container = styled.section`
  display: flex;
  flex-direction: row;
  gap: 120px;

  @media only screen and (max-width: 1200px) {
    gap: 60px;
  }

  @media only screen and (max-width: 960px) {
    flex-direction: column;
    gap: 0;
    align-items: center;
  }
`

const AboutContainer = styled.div`
  flex: 1 1 auto;
  padding-top: 99px;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  gap: 33px;

  p {
    color: #616161;
  }

  @media only screen and (max-width: 960px) {
    padding-top: 0;
    gap: 20px;
  }
`

const TextContainer = styled.div`
  p:not(:last-child) {
    margin-bottom: 25px;
  }

  @media only screen and (max-width: 960px) {
    p:not(:last-child) {
      margin-bottom: 15px;
    }
  }
`

const ImageContainer = styled.div`
  flex: 1 1 auto;
  display: block;
  max-width: 596px;
  width: 100%;
  max-height: 596px;
  height: 100%;
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
          src="/pablo_savings.png"
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
