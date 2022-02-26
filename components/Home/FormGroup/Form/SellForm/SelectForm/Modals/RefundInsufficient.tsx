import React from "react"
import Button from "./components/Button"
import ButtonsRow from "./components/ButtonsRow"
import Container from "./components/Container"
import Title from "./components/Title"

type RefundInsufficientProps = {
  onAccept: () => void
}

function RefundInsufficient({ onAccept }: RefundInsufficientProps) {
  return (
    <Container>
      <Title>
        Ой-ой. Вы прислали недостаточное количество криптовалюты, чтобы
        совершить возврат.
      </Title>
      <ButtonsRow>
        <Button onClick={onAccept} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundInsufficient
