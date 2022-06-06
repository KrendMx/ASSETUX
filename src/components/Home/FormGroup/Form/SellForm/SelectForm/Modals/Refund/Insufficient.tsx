import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import styled from "styled-components"

import Button from "@/src/shared/ModalComponents/Button"
import ButtonsRow from "@/src/shared/ModalComponents/ButtonsRow"
import Container from "@/src/shared/ModalComponents/Container"
import Title from "@/src/shared/ModalComponents/Title"
import Icon from "@/src/shared/ModalComponents/Icon"
import Shadow from "@/src/shared/ModalComponents/Shadow"
import InputSelect from "@/src/shared/InputSelect"
import Info from "@/src/shared/ModalComponents/Info"

import type { Option } from "@/src/shared/InputSelect/types"

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
