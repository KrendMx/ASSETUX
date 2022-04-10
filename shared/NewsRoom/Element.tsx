import React from "react"
import styled from "styled-components"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"

import AdaptiveFont from "@/shared/AdaptiveFont"

import { selectShowSkeleton } from "@/src/redux/uiSlice"
import { useAppSelector } from "@/src/redux/hooks"
import { mobile } from "@/src/constants"

import config from "@/src/config"

const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1.5,
  tabletFactor: 1.2
})`
  width: 100%;
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImgContainer = styled.div`
  display: block;
  width: 85%;
  position: relative;
`

const ImgSkeleton = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`

const InfoContainer = styled.div`
  padding: 32px 30px;
  width: 100%;

  @media only screen and (max-width: ${mobile}px) {
    padding: 20px 15px;
  }
`

const Title = styled.h4`
  font-size: 1em;
  font-weight: 500;
  color: var(--black);
`

const Description = styled.p`
  font-weight: 400;
  font-size: 0.78em;
  color: var(--gray);
  margin: 15px 0 18px;

  @media only screen and (max-width: ${mobile}px) {
    margin: 13px 0 15px;
  }
`

const Info = styled.div`
  font-size: 0.78em;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`

const Author = styled.a`
  text-decoration: none;
  font-weight: 500;
  color: var(--blue);

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.15em;
  }
`

const PostDate = styled.time`
  font-weight: 400;
  color: var(--gray);
`

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
          <ImgSkeleton>
            <Skeleton height="100%" />
          </ImgSkeleton>
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
