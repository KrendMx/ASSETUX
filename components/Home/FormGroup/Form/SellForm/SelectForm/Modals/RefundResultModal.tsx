import React from "react"
import Container from "./components/Container"
import Title from "./components/Title"
import Info from "./components/Info"
import ButtonsRow from "./components/ButtonsRow"
import Button from "./components/Button"

type RefundResultModalProps = {
  onAccept?: () => void
}

function RefundResultModal({ onAccept }: RefundResultModalProps) {
  return (
    <Container>
      <Title>Refund was success</Title>
      <Info>
        Thanks for using our service! In 5 minutes you will receve an email.
      </Info>

      <ButtonsRow>
        <Button onClick={() => onAccept && onAccept()} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundResultModal
