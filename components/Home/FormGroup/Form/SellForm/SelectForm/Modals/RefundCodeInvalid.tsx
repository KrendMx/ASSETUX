import React from "react"
import Button from "./components/Button"
import ButtonsRow from "./components/ButtonsRow"
import Container from "./components/Container"
import Title from "./components/Title"

type RefundCodeInvalidProps = {
  onAccept: () => void
}

function RefundCodeInvalid({ onAccept }: RefundCodeInvalidProps) {
  return (
    <Container>
      <Title>askdkasdk</Title>
      <ButtonsRow>
        <Button onClick={onAccept} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundCodeInvalid
