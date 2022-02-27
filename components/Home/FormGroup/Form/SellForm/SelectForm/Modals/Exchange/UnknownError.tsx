import React from "react"
import Image from "next/image"
import Container from "../components/Container"
import Title from "../components/Title"
import ButtonsRow from "../components/ButtonsRow"
import Button from "../components/Button"
import Icon from "../components/Icon"
import Shadow from "../components/Shadow"
import Info from "../components/Info"

type UnknownErrorProps = {
  onAccept?: () => void
}

function UnknownError({ onAccept }: UnknownErrorProps) {
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
        <span>Something went wrong</span>
      </Title>
      <Info misc>
        Возврат не удалось выполнить. Вероятнее всего, вы, все сделали
        правильно.
      </Info>
      <Info misc>
        Обратиться в поддержку - это самое верное решение в сложившейся ситуации
      </Info>
      <ButtonsRow>
        <Button onClick={onAccept} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default UnknownError
