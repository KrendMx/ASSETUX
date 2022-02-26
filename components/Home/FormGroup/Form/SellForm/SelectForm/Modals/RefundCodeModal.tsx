import React, { useState } from "react"
import Container from "./components/Container"
import Title from "./components/Title"
import ButtonsRow from "./components/ButtonsRow"
import Button from "./components/Button"
import InputSelect from "../../../InputSelect"

type RefundCodeModalProps = {
  onCancel?: () => void
  onAccept?: (code: string) => void
}

function RefundCodeModal({ onCancel, onAccept }: RefundCodeModalProps) {
  const [code, setCode] = useState("")

  return (
    <Container>
      <Title>Code was sent to your email</Title>
      <InputSelect
        value={code}
        label="Code"
        changeable
        onChange={(event) => setCode(event.target.value)}
      />
      <ButtonsRow>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onAccept && onAccept(code)} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundCodeModal
