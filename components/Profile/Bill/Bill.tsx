import React from "react"
import styled from "styled-components"

import AdaptiveFont from "@/shared/AdaptiveFont"
import InputSelect from "@/shared/InputSelect"
import ExchangeInfo from "@/shared/ExchangeInfo"
import { Form, FormHeading, Button } from "../shared/FormComponents"

import type { Profile } from "@/src/BackendClients/ecommerce/types"

const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1.3335,
  tabletFactor: 1.25
})``

const Paragraph = styled.p`
  margin: 1em 0;
  color: #2b2b2b;
`

const List = styled.ol`
  padding-left: 1.1em;
`

const Item = styled.li`
  color: #2b2b2b;
`

const FormContainer = styled.div`
  max-width: 574px;
  width: 100%;
  margin-top: 1.5em;
`

export type BillProps = Profile

function Bill({}: BillProps) {
  return (
    <Container>
      <Paragraph>Чтобы выставить счёт:</Paragraph>
      <List>
        <Item>Заполните платежную информацию.</Item>
        <Item>Нажмите “Копировать платежную ссылку”.</Item>
        <Item>Отправьте её клиенту.</Item>
      </List>
      <Paragraph>Когда платеж будет произведен, вы получите E-mail.</Paragraph>
      <FormContainer>
        <Form gap="0.9em">
          <FormHeading>Создать новый</FormHeading>
          <InputSelect label="Блокчейн" id="blockchain" selectable={false} />
          <InputSelect label="Ты получаешь" id="get" changeable />
          <ExchangeInfo
            token="BCT"
            currency="RUB"
            rate={2707854.22}
            isLoading={false}
            placeholder="Все комиссии включены"
            text="asdasd"
          />
          <InputSelect label="Клиент платит" id="give" changeable />
          <Button type="submit">Копировать ссылку на оплату</Button>
        </Form>
      </FormContainer>
    </Container>
  )
}

export default Bill
