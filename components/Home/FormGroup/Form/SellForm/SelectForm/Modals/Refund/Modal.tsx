import React from "react"
import Image from "next/image"
import InputSelect from "../../../../InputSelect"
import Container from "../components/Container"
import Title from "../components/Title"
import Info from "../components/Info"
import ButtonsRow from "../components/ButtonsRow"
import Button from "../components/Button"
import Shadow from "../components/Shadow"
import Icon from "../components/Icon"

import type { Option } from "../../../../InputSelect/types"

type RefundModalProps = {
  sentToken?: Option
  getToken?: Option
  sentValue?: string
  getValue?: string
  isLoading?: boolean
  onCancel?: () => void
  onAccept?: () => void
}

function RefundModal({
  sentToken,
  getToken,
  sentValue,
  getValue,
  isLoading,
  onCancel,
  onAccept
}: RefundModalProps) {
  if (!sentToken || !getToken) {
    return null
  }

  return (
    <Container>
      <Title>
        <Shadow>
          <Icon>
            <Image
              src="/assets/Question.svg"
              layout="fill"
              alt="Question"
              objectFit="contain"
              objectPosition="center"
            />
          </Icon>
        </Shadow>
        <span>Please confirm action</span>
      </Title>
      <InputSelect
        label="You sent"
        id="refund_sent"
        value={sentValue}
        options={[sentToken]}
        selectable={false}
      />
      <Info>Are you sure you want to refund?</Info>
      <InputSelect
        label="You get"
        id="refund_get"
        value={getValue}
        options={[getToken]}
        selectable={false}
      />
      <ButtonsRow>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onAccept} main>
          {isLoading ? "Loading..." : "OK"}
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundModal
