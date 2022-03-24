import React from "react"
import { useTranslation } from "next-i18next"
import styled from "styled-components"
import Image from "next/image"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Skeleton from "react-loading-skeleton"
import { selectShowSkeleton } from "@/src/redux/uiSlice"
import { useAppSelector } from "@/src/redux/hooks"
import { mobileLayoutForTablet } from "@/src/constants"

const Container = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
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

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
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
    white-space: pre-line;
  }

  p:not(:last-child) {
    margin-bottom: 25px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
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

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 100%;
  }
`

const SkeletonContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    padding: 20px;
  }
`

function AboutUs() {
  const { t } = useTranslation("home")

  const showSkeleton = useAppSelector(selectShowSkeleton)

  return (
    <Container>
      <AboutContainer>
        <h3>
          {!showSkeleton ? t("home:about_title") : <Skeleton width="50%" />}
        </h3>
        <TextContainer>
          {!showSkeleton ? (
            <>
              <p>{t("home:about_p1")}</p>
              <p>{t("home:about_p2")}</p>
              <p>{t("home:about_p3")}</p>
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
        {showSkeleton && (
          <SkeletonContainer>
            <Skeleton height="100%" />
          </SkeletonContainer>
        )}
      </ImageContainer>
    </Container>
  )
}

export default AboutUs
