import React from "react"
import Button from "./components/Button"
import ButtonsRow from "./components/ButtonsRow"
import Container from "./components/Container"
import Icon from "./components/Icon"
import Info from "./components/Info"
import Title from "./components/Title"

type RefundCodeInvalidProps = {
  onAccept: () => void
}

function RefundCodeInvalid({ onAccept }: RefundCodeInvalidProps) {
  return (
    <Container>
      <Title>
        <Icon />
        <span>Error</span>
      </Title>
      <Info>You entered invalid code</Info>
      <ButtonsRow>
        <Button onClick={onAccept} main>
          Try again
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundCodeInvalid
