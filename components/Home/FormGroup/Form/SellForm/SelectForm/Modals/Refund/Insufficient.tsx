import React, { useState } from "react"
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
        <span>You sent insufficient crypto amount to make refund</span>
      </Title>
      <InputSelect
        label="You sent"
        id="refund_sent"
        value={sentValue}
        options={[sentToken]}
        selectable={false}
      />
      <Ahtung>
        Согласно правилам пользования Assetux, средства поступившие на кошелек и
        не использованные в операции обмена - не возвращаются
      </Ahtung>
      <Info>Ваш отзыв поможет нам стать лучше!</Info>
      <InputSelect
        id="refund_review"
        label="Your message"
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
