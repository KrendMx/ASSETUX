import React from "react"
import styled from "styled-components"
import Image from "next/image"

const Container = styled.article`
  width: 383px;
  border-radius: 10px;
  box-shadow: 1px 4px 19px rgba(0, 0, 0, 0.12);
  background-color: var(--bgColor);
  font-size: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 19px 30px;

  @media only screen and (max-width: 1340px) {
    font-size: 1.2em;
  }

  @media only screen and (max-width: 495px) {
    font-size: 1.5em;
  }
`

const ImgContainer = styled.div`
  display: block;
  width: 85%;
`

const InfoContainer = styled.div``

const Title = styled.h4`
  font-size: 1em;
  font-weight: 500;
  color: var(--black);
  margin: 20px 0 0;
`

const Description = styled.p`
  font-weight: 400;
  font-size: 0.78em;
  color: var(--gray);
  margin: 15px 0 18px;
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

  @media only screen and (max-width: 495px) {
    font-size: 1.15em;
  }
`

const Date = styled.span`
  font-weight: 400;
  color: var(--gray);
`

function Element() {
  return (
    <Container>
      <ImgContainer>
        <Image
          src="/pablo_lost.png"
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
