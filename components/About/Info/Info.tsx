import React from "react"

import {
  Container,
  Title,
  Colored,
  SubTitleParagraph,
  DescriptionSide,
  ExampleBlocks,
  BlockTitle,
  ExampleDescription,
  Paragraph,
  Bold,
  GoodBlock,
  BadBlock,
  BlockList,
  BlockItem,
  CheckMarkContainer,
  CloseMarkContainer
} from "./styles"

import { CloseMark, CheckMark } from "./icons"

function Info() {
  return (
    <Container>
      <Title>
        <Colored colorIn="green">Покупай</Colored>/
        <Colored colorIn="red">продавай</Colored> проще
      </Title>
      <SubTitleParagraph>
        ASSETUX сократил пути покупки/продажи, сделав их удобнее.
      </SubTitleParagraph>
      <ExampleBlocks>
        <DescriptionSide>
          <ExampleDescription>
            <Paragraph>
              ≈90% коинов не продаются на известных централизованных
              криптобиржах. Еще ≈90% можно купить только другой криптой.{" "}
            </Paragraph>
            <Paragraph>
              <Bold>Пример: Как купить коин TAP от Tap Fantasy?</Bold>
              <br />
              (только вышедший в свободный рынок после IDO
              <br />
              (первичного размещения на децентрализованной бирже))
            </Paragraph>
          </ExampleDescription>
          <GoodBlock>
            <BlockTitle>В Assetux ≈ 1 мин.</BlockTitle>
            <BlockList decreaseMargins>
              <BlockItem>
                <CheckMarkContainer>
                  <CheckMark />
                </CheckMarkContainer>
                <span>Покупаешь коин TAP с карты</span>
              </BlockItem>
            </BlockList>
          </GoodBlock>
        </DescriptionSide>
        <BadBlock>
          <BlockTitle>Где - то ≈ 20 мин.</BlockTitle>
          <BlockList>
            <BlockItem>
              <CloseMarkContainer>
                <CloseMark />
              </CloseMarkContainer>
              <span>Ищешь место продажи TAP</span>
            </BlockItem>
            <BlockItem>
              <CloseMarkContainer>
                <CloseMark />
              </CloseMarkContainer>
              <span>Покупаешь с карты BNB</span>
            </BlockItem>
            <BlockItem>
              <CloseMarkContainer>
                <CloseMark />
              </CloseMarkContainer>
              <span>Выводишь BNB на WEB3 кошелёк, например MetaMask</span>
            </BlockItem>
            <BlockItem>
              <CloseMarkContainer>
                <CloseMark />
              </CloseMarkContainer>
              <span>Обмениваешь BNB на TAP через pancakeswap</span>
            </BlockItem>
          </BlockList>
        </BadBlock>
      </ExampleBlocks>
    </Container>
  )
}

export default Info
