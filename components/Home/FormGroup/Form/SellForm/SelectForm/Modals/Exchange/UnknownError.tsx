import React from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Container from "@/shared/ModalComponents/Container"
import Title from "@/shared/ModalComponents/Title"
import ButtonsRow from "@/shared/ModalComponents/ButtonsRow"
import Button from "@/shared/ModalComponents/Button"
import Icon from "@/shared/ModalComponents/Icon"
import Shadow from "@/shared/ModalComponents/Shadow"
import Info from "@/shared/ModalComponents/Info"

type UnknownErrorProps = {
  onAccept?: () => void
}

function UnknownError({ onAccept }: UnknownErrorProps) {
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
        <span>{t("home:sell_smthWentWrong")}</span>
      </Title>
      <Info misc>{t("home:sell_refundError")}</Info>
      <Info misc>{t("home:sell_callSupport")}</Info>
      <ButtonsRow>
        <Button onClick={onAccept} main>
          OK
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default UnknownError
