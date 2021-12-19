import React from "react"
import styled from "styled-components"
import Image from "next/image"
import AdaptiveFont from "@/shared/AdaptiveFont"
import Skeleton from "react-loading-skeleton"
import { useAppSelector } from "@/src/redux/hooks"
import { mobile } from "@/src/constants"

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

const Date = styled.span`
  font-weight: 400;
  color: var(--gray);
`

function Element() {
  const appLoaded = useAppSelector((state) => state.ui.appLoaded)

  return (
    <Container as="article">
      <ImgContainer>
        <Image
          src="/pablo/pablo_lost.png"
          layout="responsive"
          width={560}
          height={416}
          alt=""
        />
        {!appLoaded && (
          <ImgSkeleton>
            <Skeleton height="100%" />
          </ImgSkeleton>
        )}
      </ImgContainer>
      <InfoContainer>
        <Title>
          {appLoaded ? (
            "The Apple Car Is Coming and Tesla Had Better Watch Out"
          ) : (
            <Skeleton />
          )}
        </Title>
        <Description>
          {appLoaded ? (
            "The world’s biggest company by market value plans to launch a car with full self-driving capabilities..."
          ) : (
            <Skeleton count={2} />
          )}
        </Description>
        <Info>
          {appLoaded ? (
            <>
              <Author>Finance</Author>
              <Date>2 days ago</Date>
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
