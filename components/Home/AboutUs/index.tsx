import React from "react"
import { useTranslation } from "next-i18next"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Skeleton from "react-loading-skeleton"
import { selectShowSkeleton } from "@/src/redux/uiSlice"
import { useAppSelector } from "@/src/redux/hooks"
import { mobile, mobileLayoutForTablet } from "@/src/constants"

const Container = styled.section`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto 150px auto;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    margin-bottom: 64px;
    flex-direction: column;
    align-items: center;
  }

  @media only screen and (max-width: ${400}px) {
    margin-bottom: 5.5em;
  }
`

const AboutContainer = styled.div`
  flex: 1 1 50%;
  padding-top: 99px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  margin-right: 120px;

  & > h3 {
    margin-bottom: 94px;
  }

  @media only screen and (max-width: 1200px) {
    margin-right: 60px;
  }

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
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

const ShowLink = styled.a`
  text-decoration: none;
  color: var(--white);
  background-color: var(--blue);
  width: 249px;
  height: 49px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-weight: 19;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    margin: 0 auto;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 16px;
  }

  @media only screen and (max-width: 400px) {
    font-size: 1.3em;
    height: 3.13em;
  }
`

const ImageContainer = styled.div`
  align-self: flex-end;
  position: relative;
  flex: 1 1 50%;
  display: block;
  max-width: 596px;
  max-height: 596px;

  @media only screen and (max-width: ${mobileLayoutForTablet}px) {
    align-self: center;
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
      <Content>
        <AboutContainer>
          <h3>
            {!showSkeleton ? t("home:about_title") : <Skeleton width="50%" />}
          </h3>
          <TextContainer>
            {!showSkeleton ? (
              <>
                <p>{t("home:about_p1")}</p>
                <p>{t("home:about_p2")}</p>
              </>
            ) : (
              <Skeleton count={10} />
            )}
          </TextContainer>
        </AboutContainer>
        <ImageContainer>
          <Image
            src="/about.png"
            width={671}
            height={466}
            alt="About us image"
            layout="responsive"
          />
          {showSkeleton && (
            <SkeletonContainer>
              <Skeleton height="100%" />
            </SkeletonContainer>
          )}
        </ImageContainer>
      </Content>
      <Link href="/about" passHref>
        <ShowLink>{t("home:about_showMore")}</ShowLink>
      </Link>
    </Container>
  )
}

export default AboutUs
