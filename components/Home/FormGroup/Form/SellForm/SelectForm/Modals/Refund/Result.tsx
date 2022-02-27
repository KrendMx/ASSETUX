import React, { useState } from "react"
import Image from "next/image"
import styled from "styled-components"
import Container from "../components/Container"
import Title from "../components/Title"
import Info from "../components/Info"
import ButtonsRow from "../components/ButtonsRow"
import Button from "../components/Button"
import Icon from "../components/Icon"
import Shadow from "../components/Shadow"
import InputSelect from "../../../../InputSelect"

import type { Option } from "../../../../InputSelect/types"

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
        <span>Refund was success</span>
      </Title>
      <InputSelect
        label="You get"
        id="refund_get"
        value={getValue}
        options={[getToken]}
        selectable={false}
      />
      <Success>
        Thanks for using our service! In 5 minutes you will receve an email.
      </Success>
      <Info>Ваш отзыв поможет нам стать лучше!</Info>
      <InputSelect
        id="refund_review"
        label="Your message"
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
