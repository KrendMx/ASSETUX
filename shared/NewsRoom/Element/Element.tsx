import React from "react"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"

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
  Author,
  PostDate
} from "./styles"

type ElementProps = {
  title: string
  text: string
  author: string
  img: string
  author_link: string
  created: string
}

function Element({
  title,
  text,
  author,
  img,
  author_link,
  created
}: ElementProps) {
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

  return (
    <Container as="article">
      <ImgContainer>
        <Image
          src={`${config.hostProtocol}://bsc.${config.host}${img}`}
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
          {!showSkeleton ? text : <Skeleton count={2} />}
        </Description>
        <Info>
          {!showSkeleton ? (
            <>
              <Author href={author_link}>{author}</Author>
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
