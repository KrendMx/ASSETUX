import React from "react"
import styled from "styled-components"
import Image from "next/image"
import AdaptiveFont from "@/shared/AdaptiveFont"
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
`

const InfoContainer = styled.div`
  padding: 32px 30px;

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
      </ImgContainer>
      <InfoContainer>
        <Title>The Apple Car Is Coming and Tesla Had Better Watch Out</Title>
        <Description>
          The world’s biggest company by market value plans to launch a car with
          full self-driving capabilities...
        </Description>
        <Info>
          <Author>Finance</Author>
          <Date>2 days ago</Date>
        </Info>
      </InfoContainer>
    </Container>
  )
}

export default Element
