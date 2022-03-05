import React, { useState } from "react"
import Image from "next/image"
import styled from "styled-components"
import Container from "@/shared/ModalComponents/Container"
import Title from "@/shared/ModalComponents/Title"
import Info from "@/shared/ModalComponents/Info"
import ButtonsRow from "@/shared/ModalComponents/ButtonsRow"
import Button from "@/shared/ModalComponents/Button"
import Icon from "@/shared/ModalComponents/Icon"
import Shadow from "@/shared/ModalComponents/Shadow"
import InputSelect from "@/shared/InputSelect"

import type { Option } from "@/shared/InputSelect/types"

const Success = styled(Info)`
  background-color: #68cc4533;
  color: var(--green);
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
`

const Ahtung = styled(Info)`
  color: var(--red);
`

const ExchangeInfo = styled(Info)`
  color: var(--gray);
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
`

type ExchangeExpiredProps = {
  onAccept: () => void
  getValue: string
  getToken?: Option
  sentValue: string
  sentToken?: Option
  rate: number
  minimalAmount: number
  orderId: string
}

function ExchangeExpired({
  onAccept,
  getValue,
  getToken,
  sentValue,
  sentToken,
  rate,
  minimalAmount,
  orderId
}: ExchangeExpiredProps) {
  const [review, setReview] = useState("")

  const success = Number(getValue) >= minimalAmount

  if (!getValue || !getToken || !sentToken || !sentValue) {
    return null
  }

  return (
    <Container>
      <Title>
        <Shadow>
          <Icon>
            <Image
              src="/assets/Exclamation-red.svg"
              layout="fill"
              alt="Exclamation"
              objectFit="contain"
              objectPosition="center"
            />
          </Icon>
        </Shadow>
        <span>Время отведенное на ордер истекло</span>
      </Title>
      <InputSelect
        label="You sent"
        id="refund_sent"
        value={sentValue}
        options={[sentToken]}
        selectable={false}
      />
      {!success && (
        <ExchangeInfo misc>
          Минимальная сумма обмена - {minimalAmount} {getToken.value}
        </ExchangeInfo>
      )}
      {success && (
        <>
          <ExchangeInfo misc>
            <span>Курс конвертации</span>
            <span>
              {rate} {getToken.value} / {sentToken.value}
            </span>
          </ExchangeInfo>
          <InputSelect
            label="You get"
            id="refund_get"
            value={getValue}
            options={[getToken]}
            selectable={false}
          />
        </>
      )}

      {!success && (
        <Ahtung>
          Согласно правилам пользования Assetux, средства поступившие на кошелек
          и не использованные в операции обмена - не возвращаются
        </Ahtung>
      )}

      {success && (
        <>
          <Info>
            Assetux обменял ту сумму, которая была на кошельке на момент
            окончания времени на операцию
          </Info>
          <Success>
            <span>Успех</span>
            <span>Номер операции: {orderId}</span>
          </Success>
        </>
      )}

      <Info>Ваш отзыв поможет нам стать лучше!</Info>
      <InputSelect
        id="refund_review"
        label="Your message"
        value={review}
        onChange={(event) => setReview(event.target.value)}
        changeable
      />
      <ButtonsRow>
        <Button onClick={() => onAccept()} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default ExchangeExpired
