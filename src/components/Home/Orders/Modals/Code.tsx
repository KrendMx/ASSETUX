import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"

import Container from "./Container"
import Title from "@/src/shared/ModalComponents/Title"
import ButtonsRow from "@/src/shared/ModalComponents/ButtonsRow"
import Button from "@/src/shared/ModalComponents/Button"
import Icon from "@/src/shared/ModalComponents/Icon"
import Shadow from "@/src/shared/ModalComponents/Shadow"
import Info from "@/src/shared/ModalComponents/Info"
import CodeInput from "@/src/shared/ModalComponents/CodeInput"

type CodeProps = {
  isLoading?: boolean
  onCancel?: () => void
  onAccept?: (code: string) => void
}

function Code({ isLoading, onCancel, onAccept }: CodeProps) {
  const { t } = useTranslation("home")

  const [code, setCode] = useState("")

  return (
    <Container>
      <Title>
        <Shadow>
          <Icon>
            <Image
              src="/assets/Exclamation-green.svg"
              layout="fill"
              alt="Exclamation"
              objectFit="contain"
              objectPosition="center"
            />
          </Icon>
        </Shadow>
        <span>{t("home:orders_codeSent")}</span>
      </Title>
      <Info>{t("home:orders_enterCode")}</Info>
      <CodeInput onChange={(code) => setCode(code)} />
      <ButtonsRow>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onAccept && onAccept(code)} main>
          {isLoading ? t("home:orders_loading") : "OK"}
        </Button>
      </ButtonsRow>
    </Container>
  )
}

export default Code
