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
`

type RefundResultModalProps = {
  onAccept?: () => void
  getValue?: string
  getToken?: Option
}

function RefundResultModal({
  onAccept,
  getValue,
  getToken
}: RefundResultModalProps) {
  const { t } = useTranslation("home")

  const [review, setReview] = useState("")

  if (!getValue || !getToken) {
    return null
  }

  return (
    <Container>
      <Title>
        <Shadow>
          <Icon>
            <Image
              src="/assets/Exclamation-green.svg"
              layout="fill"
              alt="Exclamation"
              objectFit="contain"
              objectPosition="center"
            />
          </Icon>
        </Shadow>
        <span>{t("home:sell_refundSuccess")}</span>
      </Title>
      <InputSelect
        label={t("home:sell_get")}
        id="refund_get"
        value={getValue}
        options={[getToken]}
        selectable={false}
      />
      <Success>{t("home:sell_receiveEmail")}</Success>
      <Info>{t("home:sell_review")}</Info>
      <InputSelect
        id="refund_review"
        label={t("home:sell_message")}
        value={review}
        onChange={(event) => setReview(event.target.value)}
        changeable
      />
      <ButtonsRow>
        <Button onClick={() => onAccept && onAccept()} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundResultModal
