import React from "react"
import Image from "next/image"
import Button from "../components/Button"
import ButtonsRow from "../components/ButtonsRow"
import Container from "../components/Container"
import Icon from "../components/Icon"
import Shadow from "../components/Shadow"
import Info from "../components/Info"
import Title from "../components/Title"

type RefundCodeInvalidProps = {
  onAccept: () => void
}

function RefundCodeInvalid({ onAccept }: RefundCodeInvalidProps) {
  return (
    <Container>
      <Title>
        <Shadow>
          <Icon>
            <Image
              src="/assets/Exclamation-red.svg"
              layout="fill"
              alt="Exclamation"
              objectFit="contain"
              objectPosition="center"
            />
          </Icon>
        </Shadow>
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
