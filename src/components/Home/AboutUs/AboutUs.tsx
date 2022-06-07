import React from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import Skeleton from "react-loading-skeleton"

import { selectShowSkeleton } from "@/redux/uiSlice/selectors"
import { useAppSelector } from "@/redux/hooks"

import AbsoluteSkeletonContainer from "@/shared/AbsoluteSkeletonContainer"

import {
  Container,
  Content,
  AboutContainer,
  TextContainer,
  ImageContainer,
  ShowLink,
  ShowLinkSkeletonContainer
} from "./styles"

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
            <AbsoluteSkeletonContainer>
              <Skeleton height="100%" />
            </AbsoluteSkeletonContainer>
          )}
        </ImageContainer>
      </Content>
      <Link href="/about" passHref>
        {showSkeleton ? (
          <ShowLinkSkeletonContainer>
            <Skeleton width="100%" height="100%" />
          </ShowLinkSkeletonContainer>
        ) : (
          <ShowLink>{t("home:about_showMore")}</ShowLink>
        )}
      </Link>
    </Container>
  )
}

export default AboutUs
