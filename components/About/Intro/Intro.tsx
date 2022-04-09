import React from "react"
import styled from "styled-components"
import Image from "next/image"

const Container = styled.section`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const AboutContainer = styled.div`
  flex: 1 1 calc(100% - 100px);
  padding-right: 100px;
`

const Title = styled.h1`
  font-weight: 600;

  && {
    font-size: 4.75em;
  }
`

const LeftTitle = styled.span`
  color: #616161;
`

const RightTitle = styled.span`
  color: var(--black);
`

const SubTitle = styled.h2`
  font-weight: 600;
  color: #616161;
  font-size: 2.21em;
  margin-top: 0.2em;
`

type ParagraphProps = {
  black?: boolean
  decreaseMargins?: boolean
}

const Paragraph = styled.p<ParagraphProps>`
  color: ${(props) => (props.black ? "var(--black)" : "var(--gray)")};
  font-weight: ${(props) => (props.black ? 500 : 400)};
  margin-top: ${(props) => (props.decreaseMargins ? "1em" : "1.5em")};
  font-size: 1.1em;
`

const ImageContainer = styled.div`
  flex: 1 1 100%;
`

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
