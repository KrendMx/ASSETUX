import React, { useState } from "react"
import Container from "./components/Container"
import Title from "./components/Title"
import ButtonsRow from "./components/ButtonsRow"
import Button from "./components/Button"
import InputSelect from "../../../InputSelect"
import Icon from "./components/Icon"

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
        <Icon />
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
