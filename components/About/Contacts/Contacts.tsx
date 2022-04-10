import React from "react"

import {
  Container,
  Title,
  Content,
  News,
  Paragraph,
  ButtonLink,
  Support,
  SupportButtonsRow
} from "./styles"

import { Telegram, Email } from "./icons"

function Contacts() {
  return (
    <Container>
      <Title>Контакты</Title>
      <Content>
        <News>
          <Paragraph>
            Подписывайcя на нас в Телеграм.
            <br />
            Будь в курсе всех новостей.
          </Paragraph>
          <ButtonLink>
            <Telegram />
            <span>Новости</span>
          </ButtonLink>
        </News>
        <Support>
          <Paragraph alignRight>
            Если возникнут вопросы - пиши в службу поддержки.
            <br />
            ASSETUX всегда на связи!
          </Paragraph>
          <SupportButtonsRow>
            <ButtonLink>
              <Telegram />
              <span>Поддержка</span>
            </ButtonLink>
            <ButtonLink>
              <Email />
              <span>Email</span>
            </ButtonLink>
          </SupportButtonsRow>
        </Support>
      </Content>
    </Container>
  )
}

export default Contacts
