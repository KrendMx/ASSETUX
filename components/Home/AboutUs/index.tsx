import React from "react"
import styled from "styled-components"
import Image from "next/image"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Skeleton from "react-loading-skeleton"
import { useAppSelector } from "@/src/redux/hooks"
import { mobileLaoyutForTablet } from "@/src/constants"

const Container = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;

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

  & > h3 {
    margin-bottom: 33px;
  }

  @media only screen and (max-width: 1200px) {
    margin-right: 60px;
  }

  @media only screen and (max-width: ${mobileLaoyutForTablet}px) {
    width: 100%;
    padding-top: 0;
    margin-right: 0;

    & > h3 {
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
  position: relative;
  flex: 1 1 50%;
  display: block;
  max-width: 596px;
  max-height: 596px;

  @media only screen and (max-width: ${mobileLaoyutForTablet}px) {
    width: 100%;
  }
`

const SkeletonContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  @media only screen and (max-width: ${mobileLaoyutForTablet}px) {
    padding: 20px;
  }
`

function AboutUs() {
  const appLoaded = useAppSelector((state) => state.ui.appLoaded)

  return (
    <Container>
      <AboutContainer>
        <h3>{appLoaded ? "About us" : <Skeleton width="50%" />}</h3>
        <TextContainer>
          {appLoaded ? (
            <>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </>
          ) : (
            <Skeleton count={10} />
          )}
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
        {!appLoaded && (
          <SkeletonContainer>
            <Skeleton height="100%" />
          </SkeletonContainer>
        )}
      </ImageContainer>
    </Container>
  )
}

export default AboutUs
