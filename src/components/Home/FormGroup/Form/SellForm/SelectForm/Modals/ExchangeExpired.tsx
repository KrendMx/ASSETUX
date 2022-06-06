import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"

import styled from "styled-components"
import Container from "@/src/shared/ModalComponents/Container"
import Title from "@/src/shared/ModalComponents/Title"
import Info from "@/src/shared/ModalComponents/Info"
import ButtonsRow from "@/src/shared/ModalComponents/ButtonsRow"
import Button from "@/src/shared/ModalComponents/Button"
import Icon from "@/src/shared/ModalComponents/Icon"
import Shadow from "@/src/shared/ModalComponents/Shadow"
import InputSelect from "@/src/shared/InputSelect"

import type { Option } from "@/src/shared/InputSelect/types"

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
  const { t } = useTranslation("home")
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
        <span>{t("home:sell_timedOut")}</span>
      </Title>
      <InputSelect
        label={t("home:sell_sent")}
        id="refund_sent"
        value={sentValue}
        options={[sentToken]}
        selectable={false}
      />
      {!success && (
        <ExchangeInfo misc>
          {t("home:sell_minimal")} - {minimalAmount} {getToken.value}
        </ExchangeInfo>
      )}
      {success && (
        <>
          <ExchangeInfo misc>
            <span>{t("home:sell_convert")}</span>
            <span>
              {rate} {getToken.value} / {sentToken.value}
            </span>
          </ExchangeInfo>
          <InputSelect
            label={t("home:sell_get")}
            id="refund_get"
            value={getValue}
            options={[getToken]}
            selectable={false}
          />
        </>
      )}

      {!success && <Ahtung>{t("home:sell_ahtung")}</Ahtung>}

      {success && (
        <>
          <Info>{t("home:sell_infoExchange")}</Info>
          <Success>
            <span>{t("home:sell_success")}</span>
            <span>
              {t("home:sell_operationId")}: {orderId}
            </span>
          </Success>
        </>
      )}

      <Info>{t("home:sell_review")}</Info>
      <InputSelect
        id="refund_review"
        label={t("home:sell_message")}
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
