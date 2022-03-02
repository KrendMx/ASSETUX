import React from "react"
import Image from "next/image"
import InputSelect from "@/shared/InputSelect"
import Container from "@/shared/ModalComponents/Container"
import Title from "@/shared/ModalComponents/Title"
import Info from "@/shared/ModalComponents/Info"
import ButtonsRow from "@/shared/ModalComponents/ButtonsRow"
import Button from "@/shared/ModalComponents/Button"
import Shadow from "@/shared/ModalComponents/Shadow"
import Icon from "@/shared/ModalComponents/Icon"

import type { Option } from "@/shared/InputSelect/types"

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
        <Button disabled={isLoading} onClick={onAccept} main>
          {isLoading ? "Loading..." : "OK"}
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundModal
