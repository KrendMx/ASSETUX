import React from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"

import Container from "@/components/common/modal-components/Container"
import Title from "@/components/common/modal-components/Title"
import ButtonsRow from "@/components/common/modal-components/ButtonsRow"
import Button from "@/components/common/modal-components/Button"
import Icon from "@/components/common/modal-components/Icon"
import Shadow from "@/components/common/modal-components/Shadow"
import Info from "@/components/common/modal-components/Info"

type UnknownErrorProps = {
  onAccept?: () => void
}

function UnknownError({ onAccept }: UnknownErrorProps) {
  const { t } = useTranslation("home")

  return (
    <Container allowScrolling>
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
