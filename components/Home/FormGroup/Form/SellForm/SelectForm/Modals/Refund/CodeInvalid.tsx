import React from "react"
import Image from "next/image"
import Button from "@/shared/ModalComponents/Button"
import ButtonsRow from "@/shared/ModalComponents/ButtonsRow"
import Container from "@/shared/ModalComponents/Container"
import Icon from "@/shared/ModalComponents/Icon"
import Shadow from "@/shared/ModalComponents/Shadow"
import Info from "@/shared/ModalComponents/Info"
import Title from "@/shared/ModalComponents/Title"

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
