import React from "react"
import Image from "next/image"

import {
  Container,
  AboutContainer,
  Title,
  LeftTitle,
  RightTitle,
  SubTitle,
  Paragraph,
  ImageContainer
} from "./styles"

function Intro() {
  return (
    <Container>
      <AboutContainer>
        <Title>
          <LeftTitle>ASSET</LeftTitle>
          <RightTitle>UX</RightTitle>
        </Title>
        <SubTitle>Безграничная Эффективность</SubTitle>
        <Paragraph black>
          Покупай, продавай, инвестируй в крипту безопасно, быстро, легко!
        </Paragraph>
        <Paragraph decreaseMargins>
          ASSETUX улучшает
          <br />
          пользовательский опыт (UX) с активами (ASSET). Исключает возможности
          ошибок пользователей, выполняя многое самостоятельно.
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
      </ImageContainer>
    </Container>
  )
}

export default Intro
