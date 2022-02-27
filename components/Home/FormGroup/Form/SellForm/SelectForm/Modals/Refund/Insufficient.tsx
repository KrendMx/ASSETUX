import React, { useState } from "react"
import Image from "next/image"
import styled from "styled-components"
import Button from "../components/Button"
import ButtonsRow from "../components/ButtonsRow"
import Container from "../components/Container"
import Title from "../components/Title"
import Icon from "../components/Icon"
import Shadow from "../components/Shadow"
import InputSelect from "../../../../InputSelect"
import Info from "../components/Info"

import type { Option } from "../../../../InputSelect/types"

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