import React from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"

import Button from "@/shared/ModalComponents/Button"
import ButtonsRow from "@/shared/ModalComponents/ButtonsRow"
import Container from "./Container"
import Icon from "@/shared/ModalComponents/Icon"
import Shadow from "@/shared/ModalComponents/Shadow"
import Info from "@/shared/ModalComponents/Info"
import Title from "@/shared/ModalComponents/Title"

type CodeInvalidProps = {
  onAccept: () => void
}

function CodeInvalid({ onAccept }: CodeInvalidProps) {
  const { t } = useTranslation("home")

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
        <span>{t("home:orders_error")}</span>
      </Title>
      <Info>{t("home:orders_enteredInvalidCode")}</Info>
      <ButtonsRow>
        <Button onClick={onAccept} main>
          {t("home:orders_tryAgain")}
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default CodeInvalid
