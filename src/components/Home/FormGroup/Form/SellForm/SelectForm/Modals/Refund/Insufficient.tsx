import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import styled from "styled-components"

import Button from "@/shared/ModalComponents/Button"
import ButtonsRow from "@/shared/ModalComponents/ButtonsRow"
import Container from "@/shared/ModalComponents/Container"
import Title from "@/shared/ModalComponents/Title"
import Icon from "@/shared/ModalComponents/Icon"
import Shadow from "@/shared/ModalComponents/Shadow"
import InputSelect from "@/shared/InputSelect"
import Info from "@/shared/ModalComponents/Info"

import type { Option } from "@/shared/InputSelect/types"

const Ahtung = styled(Info)`
  color: var(--red);
`

type RefundInsufficientProps = {
  onAccept: () => void
  sentValue?: string
  sentToken?: Option
}

function RefundInsufficient({
  onAccept,
  sentValue,
  sentToken
}: RefundInsufficientProps) {
  const { t } = useTranslation("home")

  const [review, setReview] = useState("")

  if (!sentValue || !sentToken) {
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
        <span>{t("home:sell_sentInsufficient")}</span>
      </Title>
      <InputSelect
        label={t("home:sell_sent")}
        id="refund_sent"
        value={sentValue}
        options={[sentToken]}
        selectable={false}
      />
      <Ahtung>{t("home:sell_ahtung")}</Ahtung>
      <Info>{t("home:sell_review")}</Info>
      <InputSelect
        id="refund_review"
        label={t("home:sell_message")}
        value={review}
        onChange={(event) => setReview(event.target.value)}
        changeable
      />
      <ButtonsRow>
        <Button onClick={onAccept} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundInsufficient