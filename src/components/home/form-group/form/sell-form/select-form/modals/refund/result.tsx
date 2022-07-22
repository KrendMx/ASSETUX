import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import styled from "styled-components"

import Container from "@/components/common/modal-components/Container"
import Title from "@/components/common/modal-components/Title"
import Info from "@/components/common/modal-components/Info"
import ButtonsRow from "@/components/common/modal-components/ButtonsRow"
import Button from "@/components/common/modal-components/Button"
import Icon from "@/components/common/modal-components/Icon"
import Shadow from "@/components/common/modal-components/Shadow"
import InputSelect from "@/components/common/input-select"

import type { Option } from "@/components/common/input-select/types"

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
    <Container allowScrolling>
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
