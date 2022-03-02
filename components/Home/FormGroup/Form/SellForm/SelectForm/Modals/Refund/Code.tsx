import React, { useState } from "react"
import Image from "next/image"
import Container from "@/shared/ModalComponents/Container"
import Title from "@/shared/ModalComponents/Title"
import ButtonsRow from "@/shared/ModalComponents/ButtonsRow"
import Button from "@/shared/ModalComponents/Button"
import InputSelect from "@/shared/InputSelect"
import Icon from "@/shared/ModalComponents/Icon"
import Shadow from "@/shared/ModalComponents/Shadow"

type RefundCodeModalProps = {
  isLoading?: boolean
  onCancel?: () => void
  onAccept?: (code: string) => void
}

function RefundCodeModal({
  isLoading,
  onCancel,
  onAccept
}: RefundCodeModalProps) {
  const [code, setCode] = useState("")

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
        <span>Code was sent to your email</span>
      </Title>
      <InputSelect
        value={code}
        id="refund_code"
        label="Enter the code"
        changeable
        onChange={(event) => setCode(event.target.value)}
      />
      <ButtonsRow>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onAccept && onAccept(code)} main>
          {isLoading ? "Loading..." : "OK"}
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundCodeModal
