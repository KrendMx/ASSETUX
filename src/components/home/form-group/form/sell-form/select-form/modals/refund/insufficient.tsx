import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import styled from "styled-components"

import Button from "@/components/common/modal-components/Button"
import ButtonsRow from "@/components/common/modal-components/ButtonsRow"
import Container from "@/components/common/modal-components/Container"
import Title from "@/components/common/modal-components/Title"
import Icon from "@/components/common/modal-components/Icon"
import Shadow from "@/components/common/modal-components/Shadow"
import InputSelect from "@/components/common/input-select"
import Info from "@/components/common/modal-components/Info"

import type { Option } from "@/components/common/input-select/types"

const Ahtung = styled(Info)`
  color: var(--red);
`

type RefundInsufficientProps = {
  onAccept: (review: string) => void
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
    <Container allowScrolling>
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
        <Button onClick={() => onAccept(review)} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundInsufficient
