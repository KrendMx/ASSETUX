import React from "react"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"
import { useTranslation } from "next-i18next"

import { selectShowSkeleton } from "@/src/redux/uiSlice/selectors"
import { useAppSelector } from "@/src/redux/hooks"

import config from "@/src/config"

import AbsoluteSkeletonContainer from "@/shared/AbsoluteSkeletonContainer"
import {
  Container,
  ImgContainer,
  InfoContainer,
  Title,
  Description,
  Info,
  ReadMore,
  PostDate
} from "./styles"

type ElementProps = {
  title: string
  shortDescription: string
  img: string
  created: string
}

function Element({ title, shortDescription, img, created }: ElementProps) {
  const { t } = useTranslation("news")
  const showSkeleton = useAppSelector(selectShowSkeleton)

  const currentDate = new Date()
  const postDate = new Date(created)

  const elapsedHours = Math.trunc(
    (currentDate.getTime() - postDate.getTime()) / 3.6e6
  )
  const elapsedDays = Math.trunc(elapsedHours / 24)
  const moreThanDay = elapsedHours >= 24
  const shouldAddPrefix = moreThanDay ? elapsedDays != 1 : elapsedHours != 1

  const displayedDate = `${moreThanDay ? elapsedDays : elapsedHours} ${
    moreThanDay ? "day" : "hour"
  }${shouldAddPrefix ? "s" : ""} ago`

  const host = config.isStage ? config.host : `bsc.${config.host}`

  return (
    <Container as="article">
      <ImgContainer>
        <Image
          src={`${config.hostProtocol}://${host}${img}`}
          layout="responsive"
          width={560}
          height={416}
          alt={`${title} image`}
        />
        {showSkeleton && (
          <AbsoluteSkeletonContainer>
            <Skeleton height="100%" />
          </AbsoluteSkeletonContainer>
        )}
      </ImgContainer>
      <InfoContainer>
        <Title>{!showSkeleton ? title : <Skeleton />}</Title>
        <Description>
          {!showSkeleton ? shortDescription : <Skeleton count={2} />}
        </Description>
        <Info>
          {!showSkeleton ? (
            <>
              <ReadMore href="#">{t("readMore")} &#10230;</ReadMore>
              <PostDate dateTime={created}>{displayedDate}</PostDate>
            </>
          ) : (
            <Skeleton />
          )}
        </Info>
      </InfoContainer>
    </Container>
  )
}

export default Element
