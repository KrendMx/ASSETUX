import React from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"

import Button from "@/src/shared/ModalComponents/Button"
import ButtonsRow from "@/src/shared/ModalComponents/ButtonsRow"
import Container from "@/src/shared/ModalComponents/Container"
import Icon from "@/src/shared/ModalComponents/Icon"
import Shadow from "@/src/shared/ModalComponents/Shadow"
import Info from "@/src/shared/ModalComponents/Info"
import Title from "@/src/shared/ModalComponents/Title"

type RefundCodeInvalidProps = {
  onAccept: () => void
}

function RefundCodeInvalid({ onAccept }: RefundCodeInvalidProps) {
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
        <span>{t("home:sell_error")}</span>
      </Title>
      <Info>{t("home:sell_invalidCode")}</Info>
      <ButtonsRow>
        <Button onClick={onAccept} main>
          {t("home:sell_tryAgain")}
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default RefundCodeInvalid
