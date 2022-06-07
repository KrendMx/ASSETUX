import React from "react"
import Image from "next/image"
import { useTranslation } from "next-i18next"
import Skeleton from "react-loading-skeleton"

import { useAppSelector } from "@/redux/hooks"
import { selectShowSkeleton } from "@/redux/uiSlice/selectors"

import {
  Container,
  AboutContainer,
  Title,
  LeftTitle,
  RightTitle,
  SubTitle,
  Paragraph,
  ImageContainer,
  SkeletonImageContainer
} from "./styles"

function Intro() {
  const { t } = useTranslation("about")

  const showSkeleton = useAppSelector(selectShowSkeleton)

  return (
    <Container>
      <AboutContainer>
        <Title>
          {showSkeleton ? (
            <Skeleton />
          ) : (
            <>
              <LeftTitle>ASSET</LeftTitle>
              <RightTitle>UX</RightTitle>
            </>
          )}
        </Title>
        <SubTitle>
          {showSkeleton ? <Skeleton count={2} /> : t("intro_subTitle")}
        </SubTitle>
        <Paragraph black>
          {showSkeleton ? <Skeleton count={2} /> : t("intro_p1")}
        </Paragraph>
        <Paragraph decreaseMargins preLine>
          {showSkeleton ? <Skeleton count={4} /> : t("intro_p2")}
        </Paragraph>
      </AboutContainer>
      <ImageContainer>
        <Image
          src="/about.png"
          layout="responsive"
          width={671}
          height={466}
          alt="About picture"
        />
        {showSkeleton && (
          <SkeletonImageContainer>
            <Skeleton width="100%" height="100%" />
          </SkeletonImageContainer>
        )}
      </ImageContainer>
    </Container>
  )
}

export default Intro
